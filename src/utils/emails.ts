import { VERIFICATION_EMAIL_TEMPLATE } from "./emails_template/verification_email_template";
import { WELCOME_EMAIL_TEMPLATE } from "./emails_template/welcome_email_template";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "./emails_template/reset_password_template";
import { transporter } from "./emailServeceConfig";
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emails_template/reset_password_success_template";

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("verificationCode", verificationToken),

        });
        console.log("Email sent successfully", response);
    } catch (error: any) {
        console.log("Error sending verification: ", error.message);
        throw new Error(`Error sending verification email:  ${error.message}`);
    }
};


export const sendWelcomeEmail = async (email: string, name: string) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Welcome Email",
            html: WELCOME_EMAIL_TEMPLATE.replace("{USER_NAME}", name),

        });
        console.log("Welcome Email sent successfully", response);
    } catch (error: any) {
        console.log(`Error sending Welcome Email:  ${error.message}`);
        throw new Error(`Error sending Welcome Email:  ${error.message}`);
    }
};


export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {

    try {
        console.log(resetUrl);
        const response = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("resetURL", resetUrl),

        });
        console.log("Welcome Email sent successfully", response);

    } catch (error: any) {
        console.error(`Error sending password reset email: ${error.message}`);
        throw new Error(`Error sending reset email:  ${error.message}`)
    }
};

export const sendResetSuccessEmail = async (email: string) => {
    try {
        const response = await transporter.sendMail({
            from: process.env.APP_EMAIL,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,

        });
        console.log("Password reset email sent successfully", response);

    } catch (error: any) {
        console.error(`Error sending password reset success email:  ${error.message}`);
        throw new Error(`Error sending reset success email:  ${error.message}`);
    }
};