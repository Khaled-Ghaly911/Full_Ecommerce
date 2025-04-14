import { RedisModule } from '../../libs/redis/src/redis.module';
import { MailModule } from 'libs/mailer/src';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { UserModule } from 'src/users/users.module';

@Module({
    imports: [
        RedisModule.forRootAsync(),
        MailModule,
        UserModule
    ],
    exports: [OtpService],
    providers: [OtpService],
})
export class OtpModule { }