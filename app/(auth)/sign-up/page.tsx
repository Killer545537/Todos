import SignUpForm from '@/components/auth/sign-up-form';

const SignUpPage = () => (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
            <SignUpForm />
        </div>
    </div>
);

export default SignUpPage;
