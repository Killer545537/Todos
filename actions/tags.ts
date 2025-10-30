'use server';

import { count, desc, eq } from 'drizzle-orm';
import { cacheLife } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { tags, todoTags } from '@/db/schema/todos';
import { getId } from '@/helpers/auth';
import type { TagWithUsage } from '@/types/todos';

/**
 * Get all tags for the current user with usage statistics.
 */
export const getTags = async (): Promise<TagWithUsage[]> => {
    'use cache: private';
    cacheLife('minutes');

    const id = await getId();
    if (!id) {
        redirect('/login');
    }

    const userTags = await db
        .select({
            id: tags.id,
            name: tags.name,
            usageCount: count(todoTags.tagId),
        })
        .from(tags)
        .leftJoin(todoTags, eq(tags.id, todoTags.tagId))
        .where(eq(tags.userId, id))
        .groupBy(tags.id, tags.name)
        .orderBy(desc(count(todoTags.tagId)), tags.name);

    return userTags;
};

/**
 * Delete a tag and all associated todo-tag relationships.
 */
export const deleteTag = async (tagId: string) => {
    const userId = await getId();
    if (!userId) {
        redirect('/login');
    }

    // Verify the tag belongs to the current user
    const [tagToDelete] = await db
        .select()
        .from(tags)
        .where(eq(tags.id, tagId))
        .limit(1);

    if (!tagToDelete || tagToDelete.userId !== userId) {
        return { success: false, message: 'Tag not found or access denied' };
    }

    // Delete the tag (this will cascade delete todoTags entries due to FK constraint)
    const [deletedTag] = await db
        .delete(tags)
        .where(eq(tags.id, tagId))
        .returning();

    if (!deletedTag) {
        return { success: false, message: 'Failed to delete tag' };
    }

    return { success: true, message: 'Tag deleted successfully' };
};
