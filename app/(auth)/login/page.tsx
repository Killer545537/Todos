import type { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
    title: 'Login Page',
    description: 'Log in to your account to get started.',
};

const LoginPage = () => (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='w-full max-w-sm'>
            <LoginForm />
        </div>
    </div>
);

export default LoginPage;
