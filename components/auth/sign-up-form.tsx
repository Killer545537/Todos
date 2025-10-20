'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { signUpUser } from '@/actions/user';
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

const formSchema = z
    .object({
        name: z
            .string()
            .min(2, {
                message: 'Username should be at least 2 characters long',
            })
            .max(50, {
                message: 'Username should be at most 50 characters long',
            }),
        email: z.email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(6, {
                message: 'Password should be at least 6 characters long',
            })
            .max(100, {
                message: 'Password should be at most 100 characters long',
            }),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            if (!data.confirmPassword) return true;
            return data.password === data.confirmPassword;
        },
        {
            message: "Passwords don't match",
            path: ['confirmPassword'],
        },
    )
    .refine((data) => data.confirmPassword.length > 0, {
        message: 'Please confirm your password',
        path: ['confirmPassword'],
    });

const signUpGoogle = async () => {
    await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/todos',
    });
};

const SignUpForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async ({
        name,
        email,
        password,
    }: z.infer<typeof formSchema>) => {
        try {
            const result = await signUpUser(name, email, password);
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error((error as Error)?.message || 'Failed to sign up');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-2xl font-bold">
                            Welcome to Todos!
                        </h1>
                        <FieldDescription>
                            Already have an account?{' '}
                            <Link href="/login" className="underline">
                                Login
                            </Link>
                        </FieldDescription>
                    </div>
                </FieldGroup>
                <Field>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Name</FieldLabel>
                                <Input
                                    {...field}
                                    placeholder="Enter your name"
                                />
                                {fieldState.error && (
                                    <FieldDescription className="text-red-500">
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                {fieldState.error && (
                                    <FieldDescription className="text-red-500">
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Enter your password"
                                />
                                {fieldState.error && (
                                    <FieldDescription className="text-red-500">
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input
                                    {...field}
                                    type="password"
                                    placeholder="Confirm your password"
                                />
                                {fieldState.error && (
                                    <FieldDescription className="text-red-500">
                                        {fieldState.error.message}
                                    </FieldDescription>
                                )}
                            </Field>
                        )}
                    />
                </Field>
                <Field>
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </Field>
                <FieldSeparator>Or</FieldSeparator>
                <Field className="mt-4 grid gap-4 sm:grid-cols-2">
                    <Button variant="outline" type="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                        >
                            <path
                                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Apple
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={signUpGoogle}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                        >
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </Field>
            </form>
            <FieldDescription className="text-center text-sm text-muted-foreground">
                By clicking continue, you agree to absolutely nothing!
            </FieldDescription>
        </div>
    );
};

export default SignUpForm;
