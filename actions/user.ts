'use server';

import { auth } from '@/lib/auth';

export const loginUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { success: true, message: 'Logged in successfully' };
    } catch (e) {
        const error = e as Error;
        return { success: false, message: error.message || 'Failed to login' };
    }
};

export const signUpUser = async (
    name: string,
    email: string,
    password: string,
) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            },
        });

        return { success: true, message: 'Signed up successfully' };
    } catch (e) {
        const error = e as Error;
        return {
            success: false,
            message: error.message || 'Failed to sign up',
        };
    }
};
