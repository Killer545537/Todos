'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Field, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(50, 'Name must be at most 50 characters long'),
});

interface TagCardProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void;
}

const TagForm = ({ onSubmit }: TagCardProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
        },
    });

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        onSubmit(data);
        form.reset();
    };

    return (
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
        </form>
    );
};

export default TagForm;
