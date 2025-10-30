'use client';

import { Loader2, Tag, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { deleteTag } from '@/actions/tags';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import type { TagWithUsage } from '@/types/todos';

const TagCard = ({ id, name, usageCount }: TagWithUsage) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmDialog(true);
    };

    const onConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const result = await deleteTag(id);

            if (result.success) {
                toast.success('Tag deleted successfully');
                setShowConfirmDialog(false);
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to delete tag');
            }
        } catch (error) {
            toast.error('Failed to delete tag');
            console.error('Error deleting tag:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const confirmMessage =
        usageCount > 0
            ? `This will remove the tag "${name}" from ${usageCount} ${usageCount === 1 ? 'todo' : 'todos'}. This action cannot be undone.`
            : `This action cannot be undone.`;

    return (
        <Card className='p-4 flex items-center justify-between hover:shadow-md transition-shadow'>
            <div className='flex items-center gap-3'>
                <Tag className='h-4 w-4 text-muted-foreground' />
                <div className='flex items-center gap-2'>
                    <span className='font-medium'>{name}</span>
                    <Badge variant='secondary' className='text-xs'>
                        {usageCount} {usageCount === 1 ? 'todo' : 'todos'}
                    </Badge>
                </div>
            </div>
            <Button
                variant='ghost'
                size='sm'
                onClick={handleDeleteClick}
                disabled={isDeleting}
                className='h-8 w-8 p-0 text-destructive hover:text-destructive disabled:opacity-50'
            >
                {isDeleting ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                    <Trash className='h-4 w-4' />
                )}
            </Button>

            <ConfirmationDialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
                title={`Delete tag "${name}"?`}
                description={confirmMessage}
                confirmText='Delete Tag'
                cancelText='Cancel'
                onConfirm={onConfirmDelete}
                isLoading={isDeleting}
                variant='destructive'
            />
        </Card>
    );
};

export default TagCard;
