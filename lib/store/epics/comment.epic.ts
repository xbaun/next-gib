import { combineEpics, Epic } from 'redux-observable';
import { exhaustMap, filter, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { client } from '../../gql/client';
import {
    FetchIssueComments,
    IFetchIssueCommentsQuery,
    IFetchIssueCommentsQueryVariables
} from '../../gql/documents/fetch-issue.graphql-gen';
import { fetchIssueCommentsFulfilled } from '../actions';
import { FETCH_ISSUE_COMMENTS } from '../actions/issue/issue.action-type';
import { ActionsType, RootStateType } from '../index';
import { PaginationState } from '../reducers/_partials/pagination.state';

const fetchIssueCommentsEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(FETCH_ISSUE_COMMENTS)),
        filter(({ payload: { number } }) => number !== undefined),
        withLatestFrom(state$),
        exhaustMap(async (action) => {
            const [
                {
                    payload: { number, more }
                },
                state
            ] = action;

            const after = more
                ? state.issues.entities[number]?.commentsPagination?.endCursor
                : undefined;

            const { data } = await client.query<
                IFetchIssueCommentsQuery,
                IFetchIssueCommentsQueryVariables
            >({
                query: FetchIssueComments,
                variables: {
                    number,
                    after
                }
            });

            const comments = data.repository?.issue?.comments.nodes?.filter(
                (comment): comment is NonNullable<typeof comment> => !!comment
            );

            let pagination: PaginationState | undefined = undefined;

            if (data.repository?.issue?.comments.pageInfo.endCursor) {
                pagination = {
                    endCursor: data.repository.issue.comments.pageInfo.endCursor,
                    hasNextPage: data.repository.issue.comments.pageInfo.hasNextPage
                };
            }
            return fetchIssueCommentsFulfilled({
                number,
                comments,
                pagination
            });
        })
    );

export default combineEpics(fetchIssueCommentsEpic);
