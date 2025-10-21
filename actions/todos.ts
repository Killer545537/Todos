'use server';

import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { tags, todos, todoTags } from '@/db/schema/todos';
import { auth } from '@/lib/auth';
import type { InsertTodo } from '@/types/todos';
import { getId } from '@/helpers/auth';

type NewTodo = Omit<InsertTodo, 'userId'> & {
    tags?: string[];
};

/**
 * Create a new todo item.
 */
export const createTodo = async ({
    title,
    description,
    priority,
    status,
    dueDate,
    reminderDate,
    tags: newTodoTags,
}: NewTodo) => {
    const id = await getId();
    if (!id) {
        redirect('/login');
    }

    const [newTodo] = await db
        .insert(todos)
        .values({
            userId: id,
            title: title,
            description: description,
            priority: priority,
            status: status,
            dueDate: dueDate ? new Date(dueDate) : null,
            reminderDate: reminderDate ? new Date(reminderDate) : null,
        })
        .returning();

    if (!newTodo) {
        return { success: false, message: 'Failed to create new Todo' };
    }

    if (newTodoTags && newTodoTags.length > 0) {
        for (const tagName of newTodoTags) {
            let [existingTag] = await db
                .select()
                .from(tags)
                .where(and(eq(tags.userId, id), eq(tags.name, tagName)))
                .limit(1);

            if (!existingTag) {
                const [newTag] = await db
                    .insert(tags)
                    .values({ userId: id, name: tagName })
                    .returning();

                existingTag = newTag;
            }

            if (!existingTag) {
                return {
                    success: false,
                    message: 'Failed to create or retrieve tag',
                };
            }

            await db.insert(todoTags).values({
                todoId: newTodo.id,
                tagId: existingTag.id,
            });
        }
    }

    return { success: true, message: 'Todo created successfully' };
};
