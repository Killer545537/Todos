import type { Metadata } from 'next';
import TagDialog from '@/components/tags/tag-dialog';
import TagCard from '@/components/tags/tags-card';

export const metadata: Metadata = {
    title: 'Tags',
    description: 'Manage your tags',
};

const TagsPage = () => {
    return (
        <div className='p-6'>
            <h1 className='text-3xl font-bold mb-4'>Tags</h1>
            <p className='text-muted-foreground'>Manage your todo tags here.</p>
            <TagCard name='work' priority='high' />
            <TagDialog />
        </div>
    );
};

export default TagsPage;
