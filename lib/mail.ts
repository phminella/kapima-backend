import 'dotenv/config';
import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function emailTemplate(text: string) {
    return `
    <div style="
    border:1px solid black;
    padding:20px;
    line-height:2px;
    font-size:20px;">
    <h2> Hello There!</h2>
    ${text}
    <p> from Capybara Team</p>
    </div>
    `;
}
export interface Envelope {
    from: string;
    to?: (string)[] | null;
}
export interface MailResponse {
    accepted?: (string)[] | null;
    rejected?: (null)[] | null;
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: Envelope;
    messageId: string;
}

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
    const info = (await transport.sendMail({
        to,
        from: 'test@example.com',
        subject: 'Your password reset token!',
        html: emailTemplate(`
        <p>Your password reset token is here!</p>
        <a href="${process.env.FRONTEND_URL}/reset?email=${to}&token=${resetToken}
        ">Click here to reset!</a>
        `),
    })) as MailResponse;
    if (process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
    }
}
