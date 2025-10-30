import {
    priorityEnum,
    statusEnum,
    type tags,
    type todos,
} from '@/db/schema/todos';

export type Todo = Omit<
    typeof todos.$inferSelect,
    'userId' | 'createdAt' | 'updatedAt'
>;

export type Tag = Omit<typeof tags.$inferSelect, 'userId'>;

export type Tags = Array<Tag>;

export type TagWithUsage = Tag & { usageCount: number };

export const STATUS_VALUES = statusEnum.enumValues;

export type Status = (typeof STATUS_VALUES)[number];

export const PRIORITY_VALUES = priorityEnum.enumValues;

export type Priority = (typeof PRIORITY_VALUES)[number];

export type TodoWithTags = Todo & { tags?: Tags };
