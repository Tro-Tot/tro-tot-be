import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserOTP(email: string, otp: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        from: 'Trotot <trotot.com@gmail.com>',
        subject: 'OTP Verification',
        template: './otp',
        context: {
          email,
          otp,
        },
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async sendUserResetPassword(email: string, resetPasswordUrl: string) {}
}
