'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PRIORITY_VALUES, STATUS_VALUES } from '@/types/todos';

type TodoFilterProps = {
    selectedStatus: string;
    selectedPriority: string;
    onStatusChange: (status: string) => void;
    onPriorityChange: (priority: string) => void;
    onReset: () => void;
    disabled?: boolean;
};

const TodoFilter = ({
    selectedStatus,
    selectedPriority,
    onStatusChange,
    onPriorityChange,
    onReset,
    disabled = false,
}: TodoFilterProps) => {
    const hasActiveFilters =
        selectedStatus !== 'all' || selectedPriority !== 'all';

    return (
        <div
            className={cn(
                'space-y-4 p-4 border border-border rounded-lg bg-card w-50',
                disabled && 'opacity-60 pointer-events-none',
            )}
        >
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-foreground'>Filters</h3>
                {hasActiveFilters && (
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={onReset}
                        disabled={disabled}
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
                            onClick={() => onStatusChange(status)}
                            disabled={disabled}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                status === selectedStatus
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
                            onClick={() => onPriorityChange(priority)}
                            disabled={disabled}
                            className={cn(
                                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200',
                                priority === selectedPriority
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
