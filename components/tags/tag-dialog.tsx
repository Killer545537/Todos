'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(50, 'Name must be at most 50 characters long'),
});

const TagDialog = () => {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
        },
    });

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        form.reset();
        setOpen(false);
    };

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
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className='space-y-4'
                    >
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Enter tag name'
                                    />
                                    {fieldState.error && (
                                        <FieldDescription className='text-red-500'>
                                            {fieldState.error.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            Add Tag
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TagDialog;
