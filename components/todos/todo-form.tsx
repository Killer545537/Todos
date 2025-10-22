import type { Tags, Todo } from '@/types/todos';

type TodoFormProps = {
    todo?: Todo & Tags;
};

const TodoForm = ({ todo }: TodoFormProps) => {
    console.log(todo);
};

export default TodoForm;
