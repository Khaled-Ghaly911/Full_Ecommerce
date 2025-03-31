import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken'
import { User } from 'src/users/models/user';
import { CreateUserInput } from 'src/users/dto/inputs/create-user.input';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/inputs/login-user.input';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
    private readonly salt_rounds = 10;
    
    constructor(
        private readonly userService: UserService,
        private configService: ConfigService
    ) {}

    
    async signUp(userDataDto: CreateUserInput): Promise<User> {
        const hashedPassword: string =  await bcrypt.hash(userDataDto.password, this.salt_rounds);
        userDataDto.password = hashedPassword;
        return this.userService.createUser(userDataDto);
    }
    
    async logIn(userDataDto: LoginUserDto, session) {
        const user: User = await this.userService.getUserByEmail(userDataDto.email);
        if(!user) {
            throw new Error('Invalid email or password');
        }
        
        const passIsOk: boolean = await bcrypt.compare(userDataDto.password, user.password);
        
        if(!user || !passIsOk){
            throw new UnauthorizedException('Invalid credentials');
        }

        const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
        console.log('Loaded JWT_SECRET:', JWT_SECRET);

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is missing! Check .env file.');
        }
        
        const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1d' });

        session.jwt = token;

        return user;
    }

    logout(session: any) {
        session.jwt = null;
    }
    

    verifyToken(token: string) {
        const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
        console.log('Loaded JWT_SECRET:', JWT_SECRET);

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is missing! Check .env file.');
        }

        try {
          return jwt.verify(token, JWT_SECRET);
        } catch (err) {
          throw new UnauthorizedException('Invalid or expired token');
        }
    }
    
    
}



