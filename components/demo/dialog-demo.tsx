'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

export function DialogDemo() {
    const [showDialog, setShowDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
        setShowDialog(false);
    };

    return (
        <div className='p-8 space-y-4'>
            <h2 className='text-2xl font-bold'>Confirmation Dialog Demo</h2>

            <Button onClick={() => setShowDialog(true)}>
                Open Confirmation Dialog
            </Button>

            <ConfirmationDialog
                open={showDialog}
                onOpenChange={setShowDialog}
                title='Delete this item?'
                description='This action cannot be undone. This will permanently delete the item and all associated data.'
                confirmText='Delete'
                cancelText='Cancel'
                onConfirm={handleConfirm}
                isLoading={isLoading}
                variant='destructive'
            />
        </div>
    );
}
