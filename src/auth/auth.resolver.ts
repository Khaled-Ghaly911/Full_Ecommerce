import { Args, Context, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/users/models/user";
import { LoginUserDto } from "./dto/inputs/login-user.input";
import { SignupUserDto } from "./dto/inputs/signup-user.input";
import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { LoginResponse } from "./dto/outputs/login.response";
import { UserService } from "src/users/users.service";
import { Request } from "express";

@Resolver(() => User)
export class AuthResolver {
    constructor(
      private authService: AuthService,
      private jwtService: JwtService,
      private configService: ConfigService,
      private userService: UserService
    ){}

    @Mutation(() => User)
    async signUp(@Args('signupData') signupData: SignupUserDto): Promise<User> {
        return this.authService.signUp(signupData);
    }

    @Mutation(() => LoginResponse)
      async login(@Args('loginUserData') loginUserData: LoginUserDto, @Context() ctx: any) {
        const { res } = ctx
        const { accessToken, refreshToken, user } = await this.authService.logIn(loginUserData);
        res.cookie('refresh_token', refreshToken, {
          httpOnly: true,                     
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'lax',                    
          path: '/',                          
          maxAge: 7 * 24 * 60 * 60 * 1000,    
        });
        
      
      console.log(`access Token in resolver ${accessToken}`)
      const payload = await this.authService.verifyToken(accessToken);
      console.log(payload);
      return { user, accessToken};
    }

    
  }
  
  // @Mutation(() => String)
  // async refreshToken(@Context() ctx: { req: Request }): Promise<string> {
  //   const { req } = ctx;
  //   const refreshToken = req.cookies['refresh_token'];
  
  //   if (!refreshToken) {
  //     throw new UnauthorizedException('No refresh token');
  //   }
  
  //   try {
  //     const payload = this.jwtService.verify(refreshToken, {
  //       secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
  //     });
  
  //     const newAccessToken = this.jwtService.sign(
  //       { id: payload.id }, // sign minimal payload (just user ID ideally)
  //       {
  //         secret: this.configService.get<string>('JWT_ACCESS_SECRET'), // if you're using different secrets
  //         expiresIn: '15m',
  //       },
  //     );
  
  //     return newAccessToken;
  //   } catch (e) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }
  