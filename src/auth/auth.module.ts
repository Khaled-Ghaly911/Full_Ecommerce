import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OtpModule } from 'src/otp/otp.module';
import { MailModule } from 'libs/mailer/src';

@Module({
  imports: [
    UserModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => (
        {
          secret: config.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {expiresIn: "15m"}
        }
      )
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development"
    }),
    OtpModule,
    MailModule
  ], 
  providers: [AuthService, AuthResolver],
  exports: [AuthService, AuthResolver]
  
})
export class AuthModule {}
