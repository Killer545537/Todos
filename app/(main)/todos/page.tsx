import TodosContainer from './todos-container';

const TodosPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Todos</h1>
            <p className="text-muted-foreground">Manage your todo tags here.</p>
            <TodosContainer />
        </div>
    );
};

export default TodosPage;
