import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Section,
    Tailwind,
    Text,
} from '@react-email/components';

interface WelcomeProps {
    name: string;
}

const Welcome = ({ name }: WelcomeProps) => (
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
                            Welcome to Todos!
                        </Text>

                        <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                            Hi {name},
                        </Text>

                        <Text className='text-[16px] text-gray-700 mb-[24px] leading-[24px]'>
                            Welcome to Todos! We're excited to have you on
                            board. You can now start organizing your tasks and
                            boost your productivity.
                        </Text>

                        <Text className='text-[16px] text-gray-700 mb-[32px] leading-[24px]'>
                            Start managing your daily tasks and never miss a
                            deadline again. Simple. Beautiful. Yours.
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

export default Welcome;
