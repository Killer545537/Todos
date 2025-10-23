'use server';

import { and, eq, desc } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { tags, todos, todoTags } from '@/db/schema/todos';
import { getId } from '@/helpers/auth';
import type { Todo, Tags } from '@/types/todos';

type NewTodo = Todo & {
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

/**
 * Get all todos for the current user with their tags.
 */
export const getTodos = async () => {
    const id = await getId();
    if (!id) {
        redirect('/login');
    }

    const todosList = await db.query.todos.findMany({
        columns: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            reminderDate: true,
            completedAt: true,
            createdAt: true,
            updatedAt: true,
        },
        where: eq(todos.userId, id),
        orderBy: [desc(todos.createdAt)],
        with: {
            todoTags: {
                columns: {},
                with: {
                    tag: {
                        columns: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    const todosWithTags = todosList.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate,
        reminderDate: todo.reminderDate,
        completedAt: todo.completedAt,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
        tags: todo.todoTags.map((tt) => ({
            name: tt.tag.name,
        })),
    }));

    return todosWithTags;
};
