import nodemailer from "nodemailer";
import {
  SMPT_HOST,
  SMPT_MAIL,
  SMPT_PASSWORD,
  SMPT_PORT,
  SMPT_SERVICE,
} from "../config";

interface MailOption {
  email: string;
  html?: string;
  subject?: string;
}
export const SendMail = async (options: MailOption) => {
  const transporter = nodemailer.createTransport({
    host: SMPT_HOST,
    port: Number(SMPT_PORT),
    service: SMPT_SERVICE,
    requireTLS: true,
    auth: {
      user: SMPT_MAIL,
      pass: SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMPT_MAIL,
    to: options.email,
    html: options.html,
    subject: options.subject,
  };

  await transporter.sendMail(mailOptions);
};
