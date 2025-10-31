'use client';

import TodoCard from '@/components/todos/todo-card';
import type { TodoWithTags } from '@/types/todos';

type TodoListProps = {
    todos: TodoWithTags[];
    filteredTodos: TodoWithTags[];
};

const TodoList = ({ todos, filteredTodos }: TodoListProps) => {
    return (
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
    );
};

export default TodoList;
