'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';
import TodoDialog from '@/components/todos/todo-dialog';
import type { TodoWithTags } from '@/types/todos';

type TodoDialogContextType = {
    openDialog: (todo?: TodoWithTags) => void;
    closeDialog: () => void;
};

const TodoDialogContext = createContext<TodoDialogContextType | undefined>(
    undefined,
);

export const useTodoDialog = () => {
    const context = useContext(TodoDialogContext);
    if (!context) {
        throw new Error('useTodoDialog must be used within TodoDialogProvider');
    }
    return context;
};

type TodoDialogProviderProps = {
    children: ReactNode;
};

export const TodoDialogProvider = ({ children }: TodoDialogProviderProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<TodoWithTags | undefined>(
        undefined,
    );

    const openDialog = (todo?: TodoWithTags) => {
        setSelectedTodo(todo);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedTodo(undefined);
    };

    return (
        <TodoDialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <TodoDialog
                todo={selectedTodo}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />
        </TodoDialogContext.Provider>
    );
};
