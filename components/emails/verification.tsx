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

interface EmailVerificationProps {
    name: string;
    verificationUrl: string;
}

const EmailVerification = ({
    name,
    verificationUrl,
}: EmailVerificationProps) => (
    <Html lang="en" dir="ltr">
        <Tailwind>
            <Head />
            <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
                    {/* Header */}
                    <Section className="text-center mb-[32px]">
                        <Text className="text-[32px] font-bold text-gray-900 m-0">
                            Todos
                        </Text>
                    </Section>

                    {/* Main Content */}
                    <Section>
                        <Text className="text-[24px] font-bold text-gray-900 mb-[16px]">
                            Verify your email address
                        </Text>

                        <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                            Hi {name},
                        </Text>

                        <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                            Thanks for signing up for Todos! To complete your
                            account setup and start organizing your notes,
                            please verify your email address by clicking the
                            button below.
                        </Text>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={verificationUrl}
                                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-medium no-underline box-border"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                            If the button above doesn&apos;t work, you can also
                            copy and paste this link into your browser:
                        </Text>
                        <Text className="text-[14px] text-blue-600 mb-[16px] leading-[20px] break-all">
                            {verificationUrl}
                        </Text>

                        <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                            If you didn&apos;t create an account with Todos, you
                            can safely ignore this email.
                        </Text>

                        <Hr className="border-gray-200 my-[24px]" />

                        <Text className="text-[14px] text-gray-500 text-center">
                            © {new Date().getFullYear()} Todos. All rights
                            reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);

export default EmailVerification;
