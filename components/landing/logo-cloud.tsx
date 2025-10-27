import Image from 'next/image';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';

export const LogoCloud = () => {
    return (
        <section className='pb-4 md:pb-6'>
            <div className='group relative m-auto max-w-6xl px-6'>
                <div className='flex flex-col items-center md:flex-row'>
                    <div className='inline md:max-w-44 md:border-r md:pr-6'>
                        <p className='text-end text-sm'>Used by</p>
                    </div>
                    <div className='relative py-6 md:w-[calc(100%-11rem)]'>
                        <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                            <div className='flex'>
                                <Image
                                    className='mx-auto h-5 w-fit dark:invert'
                                    src='https://html.tailus.io/blocks/customers/nvidia.svg'
                                    alt='Nvidia Logo'
                                    height={0}
                                    width={0}
                                    style={{ height: 20, width: 'auto' }}
                                />
                            </div>
                            <div className='flex'>
                                <Image
                                    className='mx-auto w-fit dark:invert'
                                    src='https://html.tailus.io/blocks/customers/github.svg'
                                    alt='GitHub Logo'
                                    height={0}
                                    width={0}
                                    style={{ height: 20, width: 'auto' }}
                                />
                            </div>
                            <div className='flex'>
                                <Image
                                    className='mx-auto w-fit dark:invert'
                                    src='https://html.tailus.io/blocks/customers/nike.svg'
                                    alt='Nike Logo'
                                    height={0}
                                    width={0}
                                    style={{ height: 20, width: 'auto' }}
                                />
                            </div>
                            <div className='flex'>
                                <Image
                                    className='mx-auto w-fit dark:invert'
                                    src='https://html.tailus.io/blocks/customers/laravel.svg'
                                    alt='Laravel Logo'
                                    height={0}
                                    width={0}
                                    style={{ height: 20, width: 'auto' }}
                                />
                            </div>
                            <div className='flex'>
                                <Image
                                    className='mx-auto w-fit dark:invert'
                                    src='https://html.tailus.io/blocks/customers/openai.svg'
                                    alt='OpenAI Logo'
                                    height={0}
                                    width={0}
                                    style={{ height: 20, width: 'auto' }}
                                />
                            </div>
                        </InfiniteSlider>
                    </div>
                </div>
            </div>
        </section>
    );
};
