import { relations } from 'drizzle-orm';
import { user } from '@/db/schema/auth-schema';
import { tags, todos, todoTags } from '@/db/schema/todos';

export const userRelations = relations(user, ({ many }) => ({
    todos: many(todos),
    tags: many(tags),
}));

export const todosRelations = relations(todos, ({ one, many }) => ({
    user: one(user, { fields: [todos.userId], references: [user.id] }),
    todoTags: many(todoTags),
}));

export const tagsRelations = relations(tags, ({ one, many }) => ({
    user: one(user, { fields: [tags.userId], references: [user.id] }),
    todoTags: many(todoTags),
}));

export const todoTagsRelations = relations(todoTags, ({ one }) => ({
    todo: one(todos, { fields: [todoTags.todoId], references: [todos.id] }),
    tag: one(tags, { fields: [todoTags.tagId], references: [tags.id] }),
}));
