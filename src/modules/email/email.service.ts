import { Injectable } from "@nestjs/common";
import { MailDataRequired, default as SendGrid } from '@sendgrid/mail';
import { configService } from "src/configs";

@Injectable()
export class EmailService {
  constructor(){
    SendGrid.setApiKey(configService.sendGridApiKey);
  }

  async sendMail(mail: MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(mail);
      console.log(`Email successfully dispatched to ${mail.to as string}`);
    } catch (error) {
      console.error(`Error while sending email`, error);
      throw error;
    }
  }
}