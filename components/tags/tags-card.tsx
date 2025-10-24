import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { priorityColors } from '@/helpers/colors';
import { cn } from '@/lib/utils';
import type { Priority, Tag } from '@/types/todos';

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
