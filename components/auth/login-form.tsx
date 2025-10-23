'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginUser } from '@/actions/user';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { Button } from '../ui/button';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from '../ui/field';

const formSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, {
            message: 'Password should be at least 6 characters long',
        })
        .max(100, {
            message: 'Password should be at most 100 characters long',
        }),
});

const loginGoogle = async () => {
    await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/todos',
    });
};

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async ({
        email,
        password,
    }: z.infer<typeof formSchema>) => {
        try {
            const result = await loginUser(email, password);
            if (result.success) {
                toast.success(result.message);
                router.push('/todos');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error((error as Error)?.message || 'Failed to login');
        }
    };

    return (
        <div className='flex flex-col gap-6'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FieldGroup>
                    <div className='flex flex-col items-center gap-2 text-center'>
                        <h1 className='text-2xl font-bold'>Welcome Back!</h1>
                        <FieldDescription>
                            Don't have an account?{' '}
                            <Link href='/sign-up' className='underline'>
                                Sign up
                            </Link>
                        </FieldDescription>
                    </div>
                </FieldGroup>
                <Field>
                    <Controller
                        name='email'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    {...field}
                                    type='email'
                                    placeholder='Enter your email'
                                />
                                {fieldState.error && (
                                    <FieldDescription className='text-red-500'>
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name='password'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    {...field}
                                    type='password'
                                    placeholder='Enter your password'
                                />
                                {fieldState.error && (
                                    <FieldDescription className='text-red-500'>
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Button type='submit' className='w-full'>
                        Login
                    </Button>
                </Field>
                <FieldSeparator>Or</FieldSeparator>
                <Field className='mt-4'>
                    <Button
                        variant='outline'
                        type='button'
                        onClick={loginGoogle}
                        className='w-full'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            className='h-5 w-5'
                        >
                            <path
                                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                                fill='currentColor'
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </Field>
            </form>
            <FieldDescription className='text-center text-sm text-muted-foreground'>
                By clicking continue, you agree to absolutely nothing!
            </FieldDescription>
        </div>
    );
};

export default LoginForm;
