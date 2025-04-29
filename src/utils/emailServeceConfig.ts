// import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail', // أو استخدم 'smtp.mailgun.org', 'smtp.sendgrid.net', حسب الخدمة
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.PASS_EMAIL, // استخدم App Password لو Gmail مفعل 2FA
    },
  });

// export const mailtrapClient = new MailtrapClient({
//     token: (process.env.MAILTRSP_TOKEN)as string,
//     // endpoint: (process.env.MAILTRAP_ENDPOINT) as string
// });

// export const sender = {
//     email: "hello@demomailtrap.co",
//     name: "Laith Alskaf",
// };

