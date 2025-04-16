import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/models/user';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/inputs/login-user.input';
import { ConfigService } from '@nestjs/config';
import { SignupUserDto } from './dto/inputs/signup-user.input';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { MailService } from 'libs/mailer/src';
import { emitWarning } from 'process';

@Injectable()
export class AuthService {
    private readonly salt_rounds = 10;
    
    constructor(
        private readonly userService: UserService,
        private configService: ConfigService,
        private jwtService: JwtService,
        private otpService: OtpService,
        private mailService: MailService,
    ) {}

    
    async signUp(
        userDataDto: SignupUserDto
    ): Promise<User> {
        const existingUser = await this.userService.getUserByEmail(userDataDto.email);
        
        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }
        
        const otp = await this.otpService.requestOTP(userDataDto.email, userDataDto.name);

        const { password } = userDataDto;
        const hashedPassword: string =  await bcrypt.hash(password, this.salt_rounds);
        const userWithHashedPassword = { ...userDataDto, password: hashedPassword}; 

        return this.userService.createUser(userWithHashedPassword);
    }
    
    async logIn(
        userDataDto: LoginUserDto
    ) {
        const user: User | null = await this.userService.getUserByEmail(userDataDto.email);

        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const JWT_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
        console.log('Loaded JWT_SECRET:', JWT_SECRET);

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is missing Check .env file.');
        }

        const passIsOk: boolean = await bcrypt.compare(userDataDto.password, user.password);
        
        if(!passIsOk){
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log(`Pass is ok : ${passIsOk}`);
        
        const payload = {
            id: user.id,
            email: user.email,
            admin: user.admin,
            verified: user.verified,
            name: user.name
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(
            payload,
            {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
            },
        );

        console.log(`Access Token ------> ${accessToken}`)

        return { accessToken, refreshToken, user };
    }

    async verifyToken(
        token: string
    ) {
        try {
          return await this.jwtService.verify(token, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET')
        });
        } catch (err) {
          throw new UnauthorizedException('Invalid or expired token');
        }
    }

    async getResetPasswordOtp(
        email: string,
    ) {
        const user: User | null = await this.userService.getUserByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const otp = await this.otpService.requestOTP(email, user.name);
        if(!otp) {      
            throw new UnauthorizedException('Failed to send OTP');
        }

        return otp;
    }

    async resetPassword(
        email: string, 
        otp: string, 
        newPassword: string
    ) {
        const user: User | null = await this.userService.getUserByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isVerified = await this.otpService.verifyOtp(email, otp);
        if(!isVerified) {
            throw new UnauthorizedException('Invalid OTP');
        }

        const hashedPassword: string =  await bcrypt.hash(newPassword, this.salt_rounds);
        return this.userService.updateUser({
            userId: String(user.id),
            name: user.name,
            password: hashedPassword,
            admin: user.admin,
            verified: user.verified,
        });
    }

    async verifyUser(
        email: string, 
        otp: string
    ) {
        const user: User | null = await this.userService.getUserByEmail(email);
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isVerified = await this.otpService.verifyOtp(email, otp);
        if(!isVerified) {
            throw new UnauthorizedException('Invalid OTP');
        }

        return this.userService.updateUser({
            userId: String(user.id),
            name: user.name,
            password: user.password,
            admin: user.admin,
            verified: true,
        });
    }

    async requestVerifyingOtp(
        email: string
    ) {
        const user: User | null = await this.userService.getUserByEmail(email);

        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const otp = await this.otpService.requestOTP(email, user.name);

        if(!otp) {      
            throw new UnauthorizedException('Failed to send OTP');
        }

        return otp;
    }
}



