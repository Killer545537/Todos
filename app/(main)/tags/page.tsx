import { Tag as TagIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { getTags } from '@/actions/tags';
import TagDialog from '@/components/tags/tag-dialog';
import TagCard from '@/components/tags/tags-card';

export const metadata: Metadata = {
    title: 'Tags',
    description: 'Manage your tags',
};

const TagsPage = async () => {
    const tags = await getTags();

    return (
        <main className='flex-1 p-8 overflow-auto'>
            <div className='max-w-6xl mx-auto space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-foreground'>
                            All Tags
                        </h1>
                        <p className='text-muted-foreground mt-2'>
                            {tags.length} {tags.length === 1 ? 'tag' : 'tags'}
                        </p>
                    </div>
                    <TagDialog />
                </div>
                <div className='grid gap-4'>
                    {tags.length === 0 ? (
                        <div className='text-center py-12'>
                            <div className='mb-4'>
                                <TagIcon className='h-12 w-12 text-muted-foreground mx-auto mb-2' />
                            </div>
                            <p className='text-muted-foreground text-lg mb-2'>
                                No tags yet
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Create your first tag to organize your todos
                            </p>
                        </div>
                    ) : (
                        tags.map((tag) => (
                            <TagCard
                                key={tag.id}
                                id={tag.id}
                                name={tag.name}
                                usageCount={tag.usageCount}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>
    );
};

export default TagsPage;
