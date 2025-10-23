import {
    Body,
    Button,
    Head,
    Hr,
    Html,
    Tailwind,
    Text,
} from '@react-email/components';
import { Container, Section } from 'lucide-react';

interface PasswordResetProps {
    name: string;
    resetUrl: string;
}

const PasswordReset = ({ name, resetUrl }: PasswordResetProps) => (
    <Html lang='en' dir='ltr'>
        <Tailwind>
            <Head />
            <Body className='bg-gray-100 font-sans py-[40px]'>
                <Container className='bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto'>
                    {/* Header */}
                    <Section className='text-center mb-[32px]'>
                        <Text className='text-[32px] font-bold text-gray-900 m-0'>
                            Todos
                        </Text>
                    </Section>

                    {/* Main Content */}
                    <Section>
                        <Text className='text-[24px] font-bold text-gray-900 mb-[16px]'>
                            Reset your password
                        </Text>

                        <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                            Hi {name},
                        </Text>

                        <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                            We received a request to reset your password for
                            your Todos account. Click the button below to create
                            a new password. This link is valid for the next 30
                            minutes.
                        </Text>

                        {/* Reset Button */}
                        <Section className='text-center mb-[32px]'>
                            <Button
                                href={resetUrl}
                                className='bg-red-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-medium no-underline box-border'
                            >
                                Reset Password
                            </Button>
                        </Section>

                        <Text className='text-[14px] text-gray-600 mb-[16px] leading-[20px]'>
                            If the button above doesn&apos;t work, you can also
                            copy and paste this link into your browser:
                        </Text>
                        <Text className='text-[14px] text-blue-600 mb-[16px] leading-[20px] break-all'>
                            {resetUrl}
                        </Text>

                        <Text className='text-[14px] text-gray-600 mb-[16px] leading-[20px]'>
                            If you didn&apos;t request a password reset, you can
                            safely ignore this email. Your password will not be
                            changed.
                        </Text>

                        <Hr className='border-gray-200 my-[24px]' />

                        <Text className='text-[14px] text-gray-500 text-center'>
                            © {new Date().getFullYear()} Todos. All rights
                            reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default PasswordReset;
