import type { Metadata } from 'next';
import { getTodos } from '@/actions/todos';
import TodoDialog from '@/components/todos/todo-dialog';
import TodoFilter from '@/components/todos/todo-filter';
import TodoList from '@/components/todos/todo-list';

export const metadata: Metadata = {
    title: 'Todos',
    description: 'Add and manage your todos',
};

type SearchParams = Promise<{
    status?: string;
    priority?: string;
}>;

const TodosPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const todos = await getTodos();

    const params = await searchParams;
    const selectedStatus = params.status || 'all';
    const selectedPriority = params.priority || 'all';

    const filteredTodos = todos.filter((todo) => {
        const statusMatch =
            selectedStatus === 'all' || todo.status === selectedStatus;
        const priorityMatch =
            selectedPriority === 'all' || todo.priority === selectedPriority;
        return statusMatch && priorityMatch;
    });

    const todoCount = todos.length;
    const filteredCount = filteredTodos.length;

    return (
        <main className='flex-1 p-8 overflow-auto'>
            <div className='max-w-6xl mx-auto space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-foreground'>
                            All Tasks
                        </h1>
                        <p className='text-muted-foreground mt-2'>
                            {filteredCount} of {todoCount}{' '}
                            {todoCount === 1 ? 'task' : 'tasks'}
                        </p>
                    </div>
                    <TodoDialog todo={undefined} />
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                    <div className='lg:col-span-1'>
                        <TodoFilter />
                    </div>

                    <TodoList todos={todos} filteredTodos={filteredTodos} />
                </div>
            </div>
        </main>
    );
};

export default TodosPage;
