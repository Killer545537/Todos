import type { Metadata } from 'next';
import TagDialog from '@/components/tags/tag-dialog';
import TagCard from '@/components/tags/tags-card';

export const metadata: Metadata = {
    title: 'Tags',
    description: 'Manage your tags',
};

const TagsPage = () => {
    const tags = [{ name: 'work', priority: 'high' as const }];

    return (
        <main className='flex-1 p-8 overflow-auto'>
            <div className='max-w-6xl mx-auto space-y-6'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-foreground'>
                        All Tags
                    </h1>
                    <TagDialog />
                </div>
                <div className='grid gap-4'>
                    {tags.length === 0 ? (
                        <div className='text-center py-12'>
                            <p className='text-muted-foreground'>
                                No tags yet. Create your first one!
                            </p>
                        </div>
                    ) : (
                        tags.map((tag) => (
                            <TagCard
                                key={tag.name}
                                name={tag.name}
                                priority={tag.priority}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default TagsPage;
