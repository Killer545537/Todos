import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up Page',
    description: 'Create a new account to get started.',
};

import { redirect } from 'next/navigation';
import SignUpForm from '@/components/auth/sign-up-form';
import { getId } from '@/helpers/auth';

const SignUpPage = async () => {
    const id = await getId();

    if (id) {
        redirect('/todos');
    }

    return (
        <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
            <div className='w-full max-w-sm'>
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;
