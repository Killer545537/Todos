import type { Metadata } from 'next';
import { getTodos } from '@/actions/todos';
import TodoCard from '@/components/todos/todo-card';
import TodoDialog from '@/components/todos/todo-dialog';
import TodoFilter from '@/components/todos/todo-filter';

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

    // Await the entire searchParams object
    const params = await searchParams;
    const selectedStatus = params.status || 'all';
    const selectedPriority = params.priority || 'all';

    // Filter todos based on selected status and priority
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

                    <div className='lg:col-span-3 space-y-4'>
                        {todos.length === 0 ? (
                            <div className='text-center py-12'>
                                <p className='text-muted-foreground'>
                                    No todos yet. Create your first one!
                                </p>
                            </div>
                        ) : filteredTodos.length === 0 ? (
                            <div className='text-center py-12'>
                                <p className='text-muted-foreground'>
                                    No todos match the selected filters.
                                </p>
                            </div>
                        ) : (
                            <div className='space-y-3'>
                                {filteredTodos.map((todo) => (
                                    <TodoCard key={todo.id} todo={todo} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TodosPage;
