import { PRIORITY_VALUES, STATUS_VALUES } from '@/types/todos';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TodoFilter = () => {
    const hasActiveFilters = true;
    const selectedStatus = 'All';
    const selectedPriority = 'All';

    return (
        <div className='space-y-4 p-4 border border-border rounded-lg bg-card w-50'>
            <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-foreground'>Filters</h3>
                {hasActiveFilters && (
                    <Button variant='ghost' size='sm'>
                        Reset
                    </Button>
                )}
            </div>

            <div>
                <label className='text-sm font-medium text-foreground mb-2 block'>
                    Status
                </label>
                <div className='space-y-2'>
                    {['all', ...STATUS_VALUES].map((status) => (
                        <Button
                            key={status}
                            variant='ghost'
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
                <label className='text-sm font-medium text-foreground mb-2 block'>
                    Priority
                </label>
                {['all', ...PRIORITY_VALUES].map((priority) => (
                    <Button
                        key={priority}
                        variant='ghost'
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
    );
};

export default TodoFilter;
