import { account, session, user, verification } from '@/db/schema/auth-schema';
import { tags, todos, todoTags } from '@/db/schema/todos';
import {
    tagsRelations,
    todosRelations,
    userRelations,
} from '@/db/schema/relations';

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
};
