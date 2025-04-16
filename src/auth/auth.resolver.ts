import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/users/models/user";
import { LoginUserDto } from "./dto/inputs/login-user.input";
import { SignupUserDto } from "./dto/inputs/signup-user.input";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginResponse } from "./dto/outputs/login.response";
import { Request, Response } from "express";

@Resolver(() => User)
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ){}
    
    @Mutation(() => User)
    async signUp(
        @Args('signupData') signupData: SignupUserDto
    ): Promise<User> {
        return this.authService.signUp(signupData);
    }

    //to_do: verify a user
    @Mutation(() => User)
    async verifyUser(
        @Args('email') email: string, 
        @Args('otp') otp: string
    ): Promise<User> {
        return this.authService.verifyUser(email, otp);
    }
    
    @Mutation(() => LoginResponse)
    async login(
        @Args('loginUserData') loginUserData: LoginUserDto, 
        @Context() ctx: { res: Response }
    ): Promise<LoginResponse> {
        const { accessToken, refreshToken, user } = await this.authService.logIn(loginUserData);
        
        console.log(`access Token in resolver ${accessToken}`)
        console.log(`refresh Token in resolver ${refreshToken}`)
        console.log(`user in resolver ${user}`)
        const payload = await this.authService.verifyToken(accessToken);
        console.log(payload);
        return { user, refreshToken, accessToken };
    }
    

    @Mutation(() => String)
    async refreshToken(
        @Context() ctx: { req: Request }
    ): Promise<string> {
        const { req } = ctx;
        const refreshToken = req.headers['authorization']?.split(' ')[1];
        console.log(`refresh token in resolver ${refreshToken}`)
        
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token');
        }
        
        try {
            const payload = this.jwtService.verify(refreshToken, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            });
        
            const newAccessToken = this.jwtService.sign(
            { payload }, 
            {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET'), 
                expiresIn: '15m',
            },
            );
        
            return newAccessToken;
        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    @Mutation(() => String)
    async requestResetPasswordOtp(
        @Args('email') email: string
    ): Promise<string> {
        return this.authService.getResetPasswordOtp(email);
    }

    @Mutation(() => User)
    async resetPassword(
        @Args('email') email: string, 
        @Args('newPassword') newPassword: string, 
        @Args('otp') otp: string
    ): Promise<User> {
        return this.authService.resetPassword(email, otp, newPassword);
    }

    @Mutation(() => String)
    async requestOtpAgain(
        @Args('email') email: string
    ) {
        return this.authService.requestVerifyingOtp(email);
    }
  }
  
  