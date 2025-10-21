import type { todos } from '@/db/schema/todos';

export type InsertTodo = typeof todos.$inferInsert;
