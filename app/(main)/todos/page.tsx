import type { Metadata } from 'next';
import { getTodos } from '@/actions/todos';
import TodoCard from '@/components/todos/todo-card';
import TodoDialog from '@/components/todos/todo-dialog';
import TodoFilter from '@/components/todos/todo-filter';

export const metadata: Metadata = {
    title: 'Todos',
    description: 'Add and manage your todos',
};

const TodosPage = async () => {
    const todos = await getTodos();
    const todoCount = todos.length;

    return (
        <main className='flex-1 p-8 overflow-auto'>
            <div className='max-w-6xl mx-auto space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-foreground'>
                            All Tasks
                        </h1>
                        <p className='text-muted-foreground mt-2'>
                            {todoCount} {todoCount === 1 ? 'task' : 'tasks'}{' '}
                            total
                        </p>
                    </div>
                    <TodoDialog todo={undefined} />
                </div>
                <TodoFilter />
                <div className='grid gap-4'>
                    {todos.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-muted-foreground'>
                                No todos yet. Create your first one!
                            </p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <TodoCard key={todo.id} todo={todo} />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default TodosPage;
