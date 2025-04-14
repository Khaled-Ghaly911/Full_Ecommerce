import {MailerService} from '@nestjs-modules/mailer';
import {Injectable} from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async sendInvitation(email: string, url: string, organization: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Invitation to join organization',
            html: `<h1>Hi,</h1><p>You have been invited to join <strong>${organization}</strong>.</p><p>Please click the link below to accept the invitation:</p><a href="${url}">Accept Invitation</a>`
        })
    }

    async sendOTP(email: string, name: string, otp: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'OTP sent to the user',
            html: `<h1>Hi ${name},</h1><p>Your OTP is <strong>${otp}</strong></p>`
        })
    }

    async sendNotification(email: string, name: string, message: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Notification',
            html: `<h1>Hi ${name},</h1><p>${message}</p>`
        })
    }
}