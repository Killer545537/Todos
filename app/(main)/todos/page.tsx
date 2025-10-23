import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Todos',
    description: 'Add and manage your todos',
};

const TodosPage = () => {
    return (
        <main className="flex-1 p-8 overflow-auto">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            All Tasks
                        </h1>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TodosPage;
