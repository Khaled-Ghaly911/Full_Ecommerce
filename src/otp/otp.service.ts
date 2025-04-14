
import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import * as crypto from "crypto"
import {compare, hash} from "bcrypt";
import {Redis} from "ioredis";
import {MailService} from "libs/mailer/src/mailer.service";
import { UserService } from "src/users/users.service";

@Injectable()
export class OtpService {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
        private userService: UserService,
        private readonly mailService: MailService,

    ) { }

    private readonly OTP_EXPIRATION_TIME = 5 * 60; 
    private readonly MAX_RETRY_COUNT = 5;
    readonly SHORT_COOLDOWN_TIME = 60;
    readonly LONG_COOLDOWN_TIME = 3600;

    getRandomSixDigit() {
        return crypto.randomInt(100000, 1000000) 
    }

    
    async storeOtp(
        email: string, 
        otp: string
    ): Promise<void> {
        await this.redisClient.set(`otp:${email}`, otp, "EX", this.OTP_EXPIRATION_TIME);
        await this.redisClient.set(`otp_retry_count:${email}`, 0, "EX", this.OTP_EXPIRATION_TIME);
    }

    async applyCooldown(
        email: string, 
        cooldownTime: number
    ): Promise<void> {
        const currentTime = Math.floor(Date.now() / 1000);
        await this.redisClient.set(`otp_cooldown:${email}`, (currentTime + cooldownTime).toString(), "EX", cooldownTime);
    }

    async isOnCooldown(
        email: string
    ) {
        const currentTime = Math.floor(Date.now() / 1000);
        const cooldownTimestamp = await this.redisClient.get(`otp_cooldown:${email}`);

        if (cooldownTimestamp && currentTime < Number(cooldownTimestamp)) {
            const timeLeft = Number(cooldownTimestamp) - currentTime;
            const minutesLeft = Math.floor(timeLeft / 60);
            const secondsLeft = timeLeft % 60;

            throw new HttpException(
                `OTP request is on cooldown. Please wait ${minutesLeft} minutes and ${secondsLeft} seconds.`,
                HttpStatus.TOO_MANY_REQUESTS,
            );
        }
    }

    async requestOTP(
        email: string, 
        name: string
    ) {

        await this.isOnCooldown(email);

        const otp = this.getRandomSixDigit().toString()

        const hashedOtp = await hash(otp, 10);

        await this.storeOtp(email, hashedOtp);

        await this.applyCooldown(email, this.SHORT_COOLDOWN_TIME);

        await this.mailService.sendOTP(email, name, otp);

        return otp;
    }

    async verifyOtp(
        email: string, 
        otp: string
    ): Promise<boolean> {
        const storedHashedOtp = await this.redisClient.get(`otp:${email}`);
        const retryKey = `otp_retry_count:${email}`;
        const retryCount = Number(await this.redisClient.get(retryKey)) || 0;
    
        if (!storedHashedOtp) {
            return false; 
        }
    
        if (retryCount >= this.MAX_RETRY_COUNT) {
            return false; 
        }
    
        const isVerified = await compare(otp, storedHashedOtp);
    
        if (!isVerified) {
            await this.redisClient.incr(retryKey);
            if (retryCount + 1 >= this.MAX_RETRY_COUNT) {
                await this.applyCooldown(email, this.LONG_COOLDOWN_TIME);
            }
            return false;
        }
    
        
        await this.redisClient.del(`otp:${email}`);
        await this.redisClient.del(retryKey);
        await this.redisClient.del(`otp_cooldown:${email}`);
    
        return true;
    }
    

}