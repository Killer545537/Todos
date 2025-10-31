import type { Metadata } from 'next';
import { getTodos } from '@/actions/todos';
import TodosClient from '@/components/todos/todos-client';

export const metadata: Metadata = {
    title: 'Todos',
    description: 'Add and manage your todos',
};

const TodosPage = async () => {
    const todos = await getTodos();

    return <TodosClient todos={todos} />;
};

export default TodosPage;
