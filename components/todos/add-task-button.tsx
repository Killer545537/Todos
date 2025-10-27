'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTodoDialog } from '@/contexts/todo-dialog-context';

const AddTaskButton = () => {
    const { openDialog } = useTodoDialog();

    return (
        <Button onClick={() => openDialog()} className='gap-2'>
            <Plus className='w-4 h-4' /> Add Task
        </Button>
    );
};

export default AddTaskButton;
