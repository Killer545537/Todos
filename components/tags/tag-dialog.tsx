'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import TagForm from './tags-form';

const TagDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='gap-2'>
                    <Plus className='w-4 h-4' /> Add Tag
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogTitle>Add New Tag</DialogTitle>
                <div className='flex flex-col gap-6'>
                    <TagForm
                        onSubmit={(data) => {
                            console.log(data);
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TagDialog;
