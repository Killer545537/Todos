import type { tags, todos, statusEnum, priorityEnum } from '@/db/schema/todos';

export type Todo = Omit<
    typeof todos.$inferSelect,
    'userId' | 'id' | 'createdAt' | 'updatedAt'
>;

export type Tags = Array<Omit<typeof tags.$inferSelect, 'userId' | 'id'>>;

export type Status = (typeof statusEnum.enumValues)[number];

export type Priority = (typeof priorityEnum.enumValues)[number];
