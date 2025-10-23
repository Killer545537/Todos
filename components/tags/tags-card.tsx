import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Priority, Tag } from '@/types/todos';

const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
} as const;

const _statusColors = {
    todo: 'text-muted-foreground',
    'in-progress': 'text-blue-600',
    completed: 'text-green-600 line-through',
} as const;

const TagCard = ({ name, priority }: Tag & { priority: Priority }) => (
    <Card className='p-4 flex items-center justify-between'>
        <div className='flex flex-col items-center gap-3'>
            <div
                className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    priorityColors[priority],
                )}
            >
                {name}
            </div>
            <Button
                variant='ghost'
                size='sm'
                className='h8 w-8 text-destructive hover:text-destructive'
            >
                <Trash className='h-4 w-4' />
            </Button>
        </div>
    </Card>
);

export default TagCard;
