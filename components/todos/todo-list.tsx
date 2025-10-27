'use client';

import { Loader2 } from 'lucide-react';
import TodoCard from '@/components/todos/todo-card';
import { useFilterLoading } from '@/contexts/filter-loading-context';
import type { TodoWithTags } from '@/types/todos';

type TodoListProps = {
    todos: TodoWithTags[];
    filteredTodos: TodoWithTags[];
};

const TodoList = ({ todos, filteredTodos }: TodoListProps) => {
    const { isLoading } = useFilterLoading();

    return (
        <div className='lg:col-span-3 space-y-4 relative min-h-[200px]'>
            {isLoading && (
                <div className='absolute inset-0 bg-background/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
                </div>
            )}

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
    );
};

export default TodoList;
