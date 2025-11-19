import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/login-form';
import { getId } from '@/helpers/auth';

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Log in to your account to get started.',
};

const AuthCheck = async () => {
    const id = await getId();

    if (id) {
        redirect('/todos');
    }

    return null;
};

const LoginPage = () => {
    return (
        <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <Suspense fallback={null}>
                    <AuthCheck />
                </Suspense>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
