import {
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uuid,
} from 'drizzle-orm/pg-core';
import { user } from '@/db/schema/auth-schema';

export const statusEnum = pgEnum('status', [
    'pending',
    'in_progress',
    'completed',
    'archived',
]);
export const priorityEnum = pgEnum('priority', [
    'low',
    'medium',
    'high',
    'urgent',
]);

export const todos = pgTable('todos', {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),

    title: text().notNull(),
    description: text().notNull(),

    status: statusEnum().default('pending').notNull(),
    priority: priorityEnum().default('medium').notNull(),

    dueDate: timestamp(),
    reminderDate: timestamp(),
    completedAt: timestamp(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

/// Basically a map storing unique tags with users
export const tags = pgTable('tags', {
    id: uuid().primaryKey().defaultRandom(),
    userId: text()
        .references(() => user.id, { onDelete: 'cascade' })
        .notNull(),
    name: text().notNull(),
});

export const todoTags = pgTable(
    'todo_tags',
    {
        todoId: uuid()
            .references(() => todos.id, { onDelete: 'cascade' })
            .notNull(),
        tagId: uuid()
            .references(() => tags.id, { onDelete: 'cascade' })
            .notNull(),
    },
    (table) => [primaryKey({ columns: [table.todoId, table.tagId] })],
);
