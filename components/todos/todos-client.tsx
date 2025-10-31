'use client';

import { useMemo, useState } from 'react';
import AddTaskButton from '@/components/todos/add-task-button';
import TodoFilter from '@/components/todos/todo-filter';
import TodoList from '@/components/todos/todo-list';
import { TodoDialogProvider } from '@/contexts/todo-dialog-context';
import type { TodoWithTags } from '@/types/todos';

type TodosClientProps = {
    todos: TodoWithTags[];
};

const TodosClient = ({ todos }: TodosClientProps) => {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedPriority, setSelectedPriority] = useState<string>('all');

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            const statusMatch =
                selectedStatus === 'all' || todo.status === selectedStatus;
            const priorityMatch =
                selectedPriority === 'all' ||
                todo.priority === selectedPriority;
            return statusMatch && priorityMatch;
        });
    }, [todos, selectedStatus, selectedPriority]);

    const todoCount = todos.length;
    const filteredCount = filteredTodos.length;

    const resetFilters = () => {
        setSelectedStatus('all');
        setSelectedPriority('all');
    };

    return (
        <TodoDialogProvider>
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
                        <AddTaskButton />
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
                        <div className='lg:col-span-1'>
                            <TodoFilter
                                selectedStatus={selectedStatus}
                                selectedPriority={selectedPriority}
                                onStatusChange={setSelectedStatus}
                                onPriorityChange={setSelectedPriority}
                                onReset={resetFilters}
                            />
                        </div>

                        <TodoList todos={todos} filteredTodos={filteredTodos} />
                    </div>
                </div>
            </main>
        </TodoDialogProvider>
    );
};

export default TodosClient;
