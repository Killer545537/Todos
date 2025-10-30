'use client';

import { CheckCircle2, Circle, Edit2, Loader2, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteTag } from '@/actions/tags';
import { deleteTodo, editTodo } from '@/actions/todos';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
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
    const [isDeleting, setIsDeleting] = useState(false);
    const [deletingTagId, setDeletingTagId] = useState<string | null>(null);
    const [tagToDelete, setTagToDelete] = useState<{
        id: string;
        name: string;
    } | null>(null);

    const onDelete = async (id: string) => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            const result = await deleteTodo(id);

            if (result.success) {
                toast.success('Todo deleted successfully');
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to delete todo');
            }
        } catch (error) {
            toast.error('Failed to delete todo');
            console.error('Error deleting todo:', error);
        } finally {
            setIsDeleting(false);
        }
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

    const handleDeleteTagClick = (tag: { id: string; name: string }) => {
        setTagToDelete(tag);
    };

    const onConfirmDeleteTag = async () => {
        if (!tagToDelete || deletingTagId) return;

        setDeletingTagId(tagToDelete.id);
        try {
            const result = await deleteTag(tagToDelete.id);

            if (result.success) {
                toast.success('Tag deleted successfully');
                setTagToDelete(null);
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to delete tag');
            }
        } catch (error) {
            toast.error('Failed to delete tag');
            console.error('Error deleting tag:', error);
        } finally {
            setDeletingTagId(null);
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
                                className='text-xs group relative pr-7'
                            >
                                {tag.name}
                                <button
                                    type='button'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTagClick(tag);
                                    }}
                                    disabled={deletingTagId === tag.id}
                                    className='absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-3 w-3 rounded-sm hover:bg-destructive/20 flex items-center justify-center disabled:opacity-50'
                                >
                                    {deletingTagId === tag.id ? (
                                        <Loader2 className='w-2 h-2 animate-spin' />
                                    ) : (
                                        <X className='w-2 h-2 text-muted-foreground hover:text-destructive' />
                                    )}
                                </button>
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
                        disabled={isDeleting}
                        className='h-8 w-8 p-0 text-destructive hover:text-destructive disabled:opacity-50'
                    >
                        {isDeleting ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                            <Trash2 className='w-4 h-4' />
                        )}
                    </Button>
                </div>
            </div>

            <ConfirmationDialog
                open={!!tagToDelete}
                onOpenChange={() => setTagToDelete(null)}
                title={`Remove tag "${tagToDelete?.name}"?`}
                description='This will remove the tag from this todo. The tag itself will remain available for other todos.'
                confirmText='Remove Tag'
                cancelText='Cancel'
                onConfirm={onConfirmDeleteTag}
                isLoading={!!deletingTagId}
                variant='destructive'
            />
        </div>
    );
};

export default TodoCard;
