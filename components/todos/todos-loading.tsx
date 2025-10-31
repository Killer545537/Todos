'use client';

import { Loader2 } from 'lucide-react';
import AddTaskButton from '@/components/todos/add-task-button';
import TodoFilter from '@/components/todos/todo-filter';
import { TodoDialogProvider } from '@/contexts/todo-dialog-context';

const TodosLoading = () => {
    return (
        <TodoDialogProvider>
            <main className='flex-1 p-8 overflow-auto relative'>
                <div className='max-w-6xl mx-auto space-y-6'>
                    {/* Header section - always visible */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold text-foreground'>
                                All Tasks
                            </h1>
                            <p className='text-muted-foreground mt-2'>
                                Loading tasks...
                            </p>
                        </div>
                        <AddTaskButton />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6 relative'>
                        {/* Filter sidebar - always visible */}
                        <div className='lg:col-span-1'>
                            <TodoFilter
                                selectedStatus='all'
                                selectedPriority='all'
                                onStatusChange={() => {}}
                                onPriorityChange={() => {}}
                                onReset={() => {}}
                                disabled={true}
                            />
                        </div>

                        {/* Main content area with loading state */}
                        <div className='lg:col-span-3 space-y-4 relative'>
                            {/* Skeleton todo cards */}
                            <div className='space-y-3'>
                                {[...Array(5)].map((_, index) => (
                                    <div
                                        key={index}
                                        className='p-4 border border-border rounded-lg bg-card animate-pulse relative overflow-hidden'
                                        style={{
                                            animationDelay: `${index * 150}ms`,
                                            animationDuration: '2s',
                                        }}
                                    >
                                        {/* Shimmer overlay */}
                                        <div
                                            className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]'
                                            style={{
                                                animationDelay: `${index * 300}ms`,
                                            }}
                                        ></div>
                                        <div className='flex items-start gap-3'>
                                            {/* Checkbox skeleton */}
                                            <div className='mt-1 w-5 h-5 bg-muted rounded-full flex-shrink-0'></div>

                                            <div className='flex-1 min-w-0 relative'>
                                                {/* Title skeleton */}
                                                <div className='h-5 bg-muted rounded w-3/4 mb-2 relative overflow-hidden'>
                                                    <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'></div>
                                                </div>

                                                {/* Description skeleton */}
                                                <div className='space-y-1'>
                                                    <div className='h-4 bg-muted rounded w-full relative overflow-hidden'>
                                                        <div
                                                            className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                            style={{
                                                                animationDelay:
                                                                    '0.2s',
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className='h-4 bg-muted rounded w-2/3 relative overflow-hidden'>
                                                        <div
                                                            className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                            style={{
                                                                animationDelay:
                                                                    '0.4s',
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>

                                                {/* Badges skeleton */}
                                                <div className='flex flex-wrap gap-2 mt-3'>
                                                    <div className='h-5 bg-muted rounded-full w-16 relative overflow-hidden'>
                                                        <div
                                                            className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                            style={{
                                                                animationDelay:
                                                                    '0.6s',
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className='h-5 bg-muted rounded-full w-20 relative overflow-hidden'>
                                                        <div
                                                            className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                            style={{
                                                                animationDelay:
                                                                    '0.8s',
                                                            }}
                                                        ></div>
                                                    </div>
                                                    {index % 3 === 0 && (
                                                        <>
                                                            <div className='h-5 bg-muted rounded-full w-12 relative overflow-hidden'>
                                                                <div
                                                                    className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                                    style={{
                                                                        animationDelay:
                                                                            '1s',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                            <div className='h-5 bg-muted rounded-full w-14 relative overflow-hidden'>
                                                                <div
                                                                    className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                                    style={{
                                                                        animationDelay:
                                                                            '1.2s',
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action buttons skeleton */}
                                            <div className='flex gap-2 flex-shrink-0'>
                                                <div className='w-8 h-8 bg-muted rounded relative overflow-hidden'>
                                                    <div
                                                        className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                        style={{
                                                            animationDelay:
                                                                '1.4s',
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className='w-8 h-8 bg-muted rounded relative overflow-hidden'>
                                                    <div
                                                        className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]'
                                                        style={{
                                                            animationDelay:
                                                                '1.6s',
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Loading overlay with blur */}
                            <div className='absolute inset-0 bg-background/40 backdrop-blur-[2px] rounded-lg flex items-center justify-center z-10 animate-in fade-in duration-300'>
                                <div className='text-center bg-card/95 backdrop-blur-sm border border-border rounded-lg p-8 shadow-lg animate-in slide-in-from-bottom-4 duration-500'>
                                    <div className='relative'>
                                        <Loader2 className='h-12 w-12 animate-spin text-primary mx-auto mb-6' />
                                        <div className='absolute inset-0 rounded-full bg-primary/20 animate-ping'></div>
                                    </div>
                                    <p className='text-foreground font-semibold text-xl mb-3'>
                                        Loading your tasks...
                                    </p>
                                    <p className='text-muted-foreground text-sm'>
                                        Please wait while we fetch your todos
                                    </p>
                                    <div className='mt-4 flex justify-center'>
                                        <div className='flex space-x-1'>
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className='w-2 h-2 bg-primary rounded-full animate-bounce'
                                                    style={{
                                                        animationDelay: `${i * 200}ms`,
                                                        animationDuration: '1s',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </TodoDialogProvider>
    );
};

export default TodosLoading;
