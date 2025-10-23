'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { STATUS_VALUES, type Tags, type Todo } from '@/types/todos';

type TodoFormProps = {
    todo?: Todo & { tags?: Tags };
    onSubmit: (data: z.infer<typeof formSchema>) => void;
};

const formSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be at most 100 characters'),
    description: z
        .string()
        .max(500, 'Description must be at most 500 characters'),
    status: z.enum(STATUS_VALUES),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    dueDate: z.date().optional(),
    reminderDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
});

const TodoForm = ({ todo, onSubmit }: TodoFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            title: todo?.title || '',
            description: todo?.description || '',
            status: todo?.status || 'pending',
            priority: todo?.priority || 'medium',
            dueDate: todo?.dueDate ? new Date(todo.dueDate) : undefined,
            reminderDate: todo?.reminderDate
                ? new Date(todo.reminderDate)
                : undefined,
            tags: todo?.tags?.map((tag) => tag.name) ?? [],
        },
    });

    const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
        onSubmit(data);
    };

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-4"
            >
                <FieldGroup>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                </FieldGroup>
            </form>
        </div>
    );
};

export default TodoForm;
