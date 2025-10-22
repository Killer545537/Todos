'use client';

import TodoForm from '@/components/todos/todo-form';

const TodosContainer = () => {
    return (
        <div className="flex">
            <TodoForm
                todo={undefined}
                onSubmit={(data) => {
                    console.log(data);
                }}
            />
        </div>
    );
};

export default TodosContainer;
