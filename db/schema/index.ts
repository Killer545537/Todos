import { account, session, user, verification } from '@/db/schema/auth-schema';
import {
    tagsRelations,
    todosRelations,
    todoTagsRelations,
    userRelations,
} from '@/db/schema/relations';
import { tags, todos, todoTags } from '@/db/schema/todos';

export const schema = {
    account,
    user,
    session,
    verification,
    todos,
    tags,
    todoTags,
    userRelations,
    todosRelations,
    tagsRelations,
    todoTagsRelations,
};
