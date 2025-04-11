import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/models/user';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/inputs/login-user.input';
import { ConfigService } from '@nestjs/config';
import { SignupUserDto } from './dto/inputs/signup-user.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly salt_rounds = 10;
    
    constructor(
        private readonly userService: UserService,
        private configService: ConfigService,
        private jwtService: JwtService
    ) {}

    
    async signUp(userDataDto: SignupUserDto): Promise<User> {
        const { password } = userDataDto;
        const hashedPassword: string =  await bcrypt.hash(password, this.salt_rounds);
        const userWithHashedPassword = { ...userDataDto, password: hashedPassword}; 
        return this.userService.createUser(userWithHashedPassword);
    }
    
    async logIn(userDataDto: LoginUserDto) {
        const JWT_SECRET = this.configService.get<string>('JWT_ACCESS_SECRET');
        console.log('Loaded JWT_SECRET:', JWT_SECRET);

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is missing Check .env file.');
        }

        const user: User = await this.userService.getUserByEmail(userDataDto.email);

        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        
        const passIsOk: boolean = await bcrypt.compare(userDataDto.password, user.password);
        
        if(!passIsOk){
            throw new UnauthorizedException('Invalid credentials');
        }

        console.log(`Pass is ok : ${passIsOk}`);
        
        const payload = {
            id: user.id,
            name: user.name,
            admin: user.admin,
            email: user.email
        };

        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET')
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

    async verifyToken(token: string) {
        try {
          return await this.jwtService.verify(token, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET')
        });
        } catch (err) {
          throw new UnauthorizedException('Invalid or expired token');
        }
    }
}



