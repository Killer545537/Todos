import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import PasswordReset from '@/components/emails/password-reset';
import EmailVerification from '@/components/emails/verification';
import { db } from '@/db/db';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Todos <onboarding@reset.dev>',
                to: [user.email],
                subject: 'Reset your password',
                react: PasswordReset({ name: user.name, resetUrl: url }),
            });
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Notely <onboarding@resend.dev>',
                to: [user.email],
                subject: 'Verify your email address',
                react: EmailVerification({
                    name: user.name,
                    verificationUrl: url,
                }),
            });
        },
        sendOnSignUp: true,
    },
    plugins: [nextCookies()],
});
