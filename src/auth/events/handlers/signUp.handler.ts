import type { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as nodemailer from 'nodemailer';
import config from 'src/config';

import { SignUpEvent } from '../impl';

@EventsHandler(SignUpEvent)
export class SignUpUserHandler implements IEventHandler<SignUpEvent> {
  handle(event: SignUpEvent) {
    try {
      const USERS_LINK = `${config.apiUrl}/api/activate/${event.user.activationLink}`;
      const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: Number(config.smtp.port),
        secure: false,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.generatedPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail({
        from: config.smtp.user,
        to: event.user.email,
        subject: `Account activation for ${config.apiUrl}`,
        html: `
          <div>
            <h1>To activate follow the link</h1>
            <a href="${USERS_LINK}">${USERS_LINK}</a>
          </div>
        `,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
