'use client';

import { Loader2 } from 'lucide-react';
import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useOptimistic, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRIORITY_VALUES, STATUS_VALUES } from '@/types/todos';

const TodoFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const selectedStatus = searchParams.get('status') || 'all';
    const selectedPriority = searchParams.get('priority') || 'all';

    const [optimisticFilters, setOptimisticFilters] = useOptimistic(
        { status: selectedStatus, priority: selectedPriority },
        (state, { key, value }: { key: string; value: string }) => ({
            ...state,
            [key]: value,
        }),
    );

    const hasActiveFilters =
        optimisticFilters.status !== 'all' ||
        optimisticFilters.priority !== 'all';

    const updateFilter = (key: string, value: string) => {
        startTransition(() => {
            setOptimisticFilters({ key, value });

            const params = new URLSearchParams(searchParams.toString());

            if (value === 'all') {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            const queryString = params.toString();
            router.push(
                (queryString
                    ? `${pathname}?${queryString}`
                    : pathname) as Route,
                { scroll: false },
            );
        });
    };

    const resetFilters = () => {
        startTransition(() => {
            setOptimisticFilters({ key: 'status', value: 'all' });
            setOptimisticFilters({ key: 'priority', value: 'all' });

            router.push(pathname as Route, { scroll: false });
        });
    };

    return (
        <div className='space-y-4 p-4 border border-border rounded-lg bg-card w-50 relative'>
            {isPending && (
                <div className='absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10'>
                    <Loader2 className='h-6 w-6 animate-spin text-primary' />
                </div>
            )}
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-foreground'>Filters</h3>
                {hasActiveFilters && (
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={resetFilters}
                        disabled={isPending}
                    >
                        Reset
                    </Button>
                )}
            </div>

            <div>
                <p className='text-sm font-medium text-foreground mb-2 block'>
                    Status
                </p>
                <div className='space-y-2'>
                    {['all', ...STATUS_VALUES].map((status) => (
                        <Button
                            key={status}
                            variant='ghost'
                            onClick={() => updateFilter('status', status)}
                            disabled={isPending}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                status === optimisticFilters.status
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'hover:bg-muted text-foreground',
                            )}
                        >
                            {status.charAt(0).toUpperCase() +
                                status.slice(1).replace('_', ' ')}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <p className='text-sm font-medium text-foreground mb-2 block'>
                    Priority
                </p>
                <div className='space-y-2'>
                    {['all', ...PRIORITY_VALUES].map((priority) => (
                        <Button
                            key={priority}
                            variant='ghost'
                            onClick={() => updateFilter('priority', priority)}
                            disabled={isPending}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                priority === optimisticFilters.priority
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'hover:bg-muted text-foreground',
                            )}
                        >
                            {priority.charAt(0).toUpperCase() +
                                priority.slice(1).replace('_', ' ')}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoFilter;
