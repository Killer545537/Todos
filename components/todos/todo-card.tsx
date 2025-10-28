'use client';

import { CheckCircle2, Circle, Edit2, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { editTodo } from '@/actions/todos';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTodoDialog } from '@/contexts/todo-dialog-context';
import { priorityColors, statusColors } from '@/helpers/colors';
import { cn } from '@/lib/utils';
import type { TodoWithTags } from '@/types/todos';

interface TodoCardProps {
    todo: TodoWithTags;
}

const TodoCard = ({ todo }: TodoCardProps) => {
    const router = useRouter();
    const { openDialog } = useTodoDialog();
    const [isToggling, setIsToggling] = useState(false);

    const onDelete = (_id: string) => {
        console.log('delete');
    };

    const onToggle = async (id: string) => {
        if (isToggling) return;

        setIsToggling(true);
        try {
            const newStatus =
                todo.status === 'completed' ? 'pending' : 'completed';
            const result = await editTodo(id, { status: newStatus });

            if (result.success) {
                toast.success(
                    `Todo ${newStatus === 'completed' ? 'completed' : 'reopened'}`,
                );
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to update todo');
            }
        } catch (error) {
            toast.error('Failed to update todo');
            console.error('Error toggling todo:', error);
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <div className='p-4 border border-border rounded-lg hover:shadow-md transition-shadow bg-card'>
            <div className='flex items-start gap-3'>
                <button
                    type='button'
                    onClick={() => onToggle(todo.id)}
                    disabled={isToggling}
                    className='mt-1 flex-shrink-0 disabled:opacity-50'
                >
                    {isToggling ? (
                        <Loader2 className='w-5 h-5 text-muted-foreground animate-spin' />
                    ) : todo.status === 'completed' ? (
                        <CheckCircle2 className='w-5 h-5 text-green-600' />
                    ) : (
                        <Circle className='w-5 h-5 text-muted-foreground hover:text-foreground' />
                    )}
                </button>

                <div className='flex-1 min-w-0'>
                    <h3
                        className={cn(
                            'font-semibold text-foreground',
                            statusColors[todo.status],
                        )}
                    >
                        {todo.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
                        {todo.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mt-3'>
                        <Badge
                            variant='outline'
                            className={priorityColors[todo.priority]}
                        >
                            {todo.priority}
                        </Badge>
                        {todo.dueDate && (
                            <Badge variant='outline' className='text-xs'>
                                Due:{' '}
                                {new Date(todo.dueDate).toLocaleDateString()}
                            </Badge>
                        )}
                        {todo.tags?.map((tag) => (
                            <Badge
                                key={tag.name}
                                variant='secondary'
                                className='text-xs'
                            >
                                {tag.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className='flex gap-2 flex-shrink-0'>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => openDialog(todo)}
                        className='h-8 w-8 p-0'
                    >
                        <Edit2 className='w-4 h-4' />
                    </Button>
                    <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => onDelete(todo.id)}
                        className='h-8 w-8 p-0 text-destructive hover:text-destructive'
                    >
                        <Trash2 className='w-4 h-4' />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
