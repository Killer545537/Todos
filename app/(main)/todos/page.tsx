import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getTodos } from '@/actions/todos';
import TodosClient from '@/components/todos/todos-client';
import TodosLoading from '@/components/todos/todos-loading';

export const metadata: Metadata = {
    title: 'Todos',
    description: 'Add and manage your todos',
};

const TodosContent = async () => {
    const todos = await getTodos();
    return <TodosClient todos={todos} />;
};

const TodosPage = () => {
    return (
        <Suspense fallback={<TodosLoading />}>
            <TodosContent />
        </Suspense>
    );
};

export default TodosPage;
