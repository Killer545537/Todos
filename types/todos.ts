import {
    priorityEnum,
    statusEnum,
    type tags,
    type todos,
} from '@/db/schema/todos';

export type Todo = Omit<
    typeof todos.$inferSelect,
    'userId' | 'id' | 'createdAt' | 'updatedAt'
>;

type Tag = Omit<typeof tags.$inferSelect, 'userId' | 'id'>;

export type Tags = Array<Tag>;

export const STATUS_VALUES = statusEnum.enumValues;

export type Status = (typeof STATUS_VALUES)[number];

export const PRIORITY_VALUES = priorityEnum.enumValues;

export type Priority = (typeof PRIORITY_VALUES)[number];
