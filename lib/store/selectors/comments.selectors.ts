import { RootStateType } from '../index';
import { IssueCommentEntity } from '../reducers/comments/comments.state';

export const selectComments = (number?: number) => (state: RootStateType) =>
    state.issueComments.ids.reduce((list, id) => {
        if (number === undefined) {
            return [];
        }

        const comment = state.issueComments.entities[id];

        if (comment?.data?.issue.number === number) {
            list.push(comment);
        }

        return list;
    }, [] as IssueCommentEntity[]);

export const selectHasMoreComments = (number?: number) => (state: RootStateType) => {
    if (number === undefined) {
        return false;
    }

    return state.issues.entities[number]?.commentsPagination?.hasNextPage ?? false;
};
