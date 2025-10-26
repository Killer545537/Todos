'use client';

import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRIORITY_VALUES, STATUS_VALUES } from '@/types/todos';

const TodoFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const selectedStatus = searchParams.get('status') || 'all';
    const selectedPriority = searchParams.get('priority') || 'all';

    const hasActiveFilters =
        selectedStatus !== 'all' || selectedPriority !== 'all';

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === 'all') {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        const queryString = params.toString();
        router.push(
            (queryString ? `${pathname}?${queryString}` : pathname) as Route,
        );
    };

    const resetFilters = () => {
        router.push(pathname as Route);
    };

    return (
        <div className='space-y-4 p-4 border border-border rounded-lg bg-card w-50'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-foreground'>Filters</h3>
                {hasActiveFilters && (
                    <Button variant='ghost' size='sm' onClick={resetFilters}>
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
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                                status === selectedStatus
                                    ? 'bg-primary text-primary-foreground'
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
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted text-foreground',
                                priority === selectedPriority
                                    ? 'bg-primary text-primary-foreground'
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
