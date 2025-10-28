import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';
import PasswordReset from '@/components/emails/password-reset';
import Welcome from '@/components/emails/welcome';
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
                from: 'Todos <onboarding@resend.dev>',
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
    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    await resend.emails.send({
                        from: 'Todos <welcome@resend.dev>',
                        to: [user.email],
                        subject: 'Welcome to Todos!',
                        react: Welcome({ name: user.name }),
                    });
                },
            },
        },
    },
    plugins: [nextCookies()],
});
