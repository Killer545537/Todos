'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    PRIORITY_VALUES,
    STATUS_VALUES,
    type TodoWithTags,
} from '@/types/todos';

type TodoFormProps = {
    todo?: TodoWithTags;
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
    priority: z.enum(PRIORITY_VALUES),
    dueDate: z.date().optional(),
    reminderDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
});

const TodoForm = ({ todo, onSubmit }: TodoFormProps) => {
    const [open, setOpen] = useState(false);
    const [tagInput, setTagInput] = useState('');

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
        form.reset();
        setOpen(false);
    };

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const trimmedTag = tagInput.trim();
            if (trimmedTag) {
                const currentTags = form.getValues('tags') || [];
                if (!currentTags.includes(trimmedTag)) {
                    form.setValue('tags', [...currentTags, trimmedTag]);
                }
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const currentTags = form.getValues('tags') || [];
        form.setValue(
            'tags',
            currentTags.filter((tag) => tag !== tagToRemove),
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='gap-2'>
                    <Plus className='w-4 h-4' /> Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
                <DialogTitle>{todo ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                <DialogDescription>
                    {todo ? 'Edit existing todo item' : 'Add a new todo item'}
                </DialogDescription>
                <div className='flex flex-col gap-6'>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className='space-y-4'
                    >
                        {/* Title Field */}
                        <Controller
                            name='title'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Title *</FieldLabel>
                                    <Input
                                        {...field}
                                        type='text'
                                        placeholder='Enter todo title'
                                    />
                                    {fieldState.error && (
                                        <FieldDescription className='text-red-500'>
                                            {fieldState.error.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            )}
                        />

                        {/* Description Field */}
                        <Controller
                            name='description'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Description</FieldLabel>
                                    <textarea
                                        {...field}
                                        placeholder='Enter todo description'
                                        rows={4}
                                        className='w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
                                    />
                                    {fieldState.error && (
                                        <FieldDescription className='text-red-500'>
                                            {fieldState.error.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-4'>
                            {/* Status Field */}
                            <Controller
                                name='status'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Status</FieldLabel>
                                        <select
                                            {...field}
                                            className='w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                        >
                                            {STATUS_VALUES.map((status) => (
                                                <option
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status
                                                        .replace('_', ' ')
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        status
                                                            .replace('_', ' ')
                                                            .slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {fieldState.error && (
                                            <FieldDescription className='text-red-500'>
                                                {fieldState.error.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Priority Field */}
                            <Controller
                                name='priority'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Priority</FieldLabel>
                                        <select
                                            {...field}
                                            className='w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                                        >
                                            {PRIORITY_VALUES.map((priority) => (
                                                <option
                                                    key={priority}
                                                    value={priority}
                                                >
                                                    {priority
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        priority.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                        {fieldState.error && (
                                            <FieldDescription className='text-red-500'>
                                                {fieldState.error.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            {/* Due Date Field */}
                            <Controller
                                name='dueDate'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Due Date</FieldLabel>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder='Select due date'
                                        />
                                        {fieldState.error && (
                                            <FieldDescription className='text-red-500'>
                                                {fieldState.error.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                )}
                            />

                            {/* Reminder Date Field */}
                            <Controller
                                name='reminderDate'
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Reminder Date</FieldLabel>
                                        <DateTimePicker
                                            value={field.value}
                                            onChange={field.onChange}
                                            placeholder='Select reminder date'
                                        />
                                        {fieldState.error && (
                                            <FieldDescription className='text-red-500'>
                                                {fieldState.error.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Tags Field */}
                        <Controller
                            name='tags'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Tags</FieldLabel>
                                    <Input
                                        type='text'
                                        placeholder='Type a tag and press Enter'
                                        value={tagInput}
                                        onChange={(e) =>
                                            setTagInput(e.target.value)
                                        }
                                        onKeyDown={handleAddTag}
                                    />
                                    {field.value && field.value.length > 0 && (
                                        <div className='flex flex-wrap gap-2 mt-2'>
                                            {field.value.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className='inline-flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-primary/10 text-primary'
                                                >
                                                    {tag}
                                                    <button
                                                        type='button'
                                                        onClick={() =>
                                                            handleRemoveTag(tag)
                                                        }
                                                        className='ml-1 hover:text-destructive'
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <FieldDescription>
                                        Press Enter to add a tag
                                    </FieldDescription>
                                    {fieldState.error && (
                                        <FieldDescription className='text-red-500'>
                                            {fieldState.error.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                            )}
                        />

                        <div className='flex justify-end gap-2 pt-4'>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => {
                                    form.reset();
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type='submit'>
                                {todo ? 'Update Task' : 'Create Task'}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TodoForm;
