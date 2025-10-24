'use client';

import TodoForm from '@/components/todos/todo-dialog';

const TodosContainer = () => {
    return (
        <div className='flex'>
            <TodoForm todo={undefined} />
        </div>
    );
};

export default TodosContainer;
