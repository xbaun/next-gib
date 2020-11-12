import { combineEpics, Epic } from 'redux-observable';
import { exhaustMap, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { client } from '../../gql/client';
import {
    FetchIssue,
    IFetchIssueQuery,
    IFetchIssueQueryVariables
} from '../../gql/documents/fetch-issue.graphql-gen';
import {
    ISearchIssuesQuery,
    ISearchIssuesQueryVariables,
    SearchIssues
} from '../../gql/documents/search-issues.graphql-gen';
import { fetchIssueFulfilled, fetchIssuesFulfilled } from '../actions';
import { FETCH_ISSUE, FETCH_ISSUES } from '../actions/issue/issue.action-type';
import { searchQueryBuilder } from '../base/query-builder';
import { ActionsType, RootStateType } from '../index';
import { PaginationState } from '../reducers/_partials/pagination.state';
import { Issue } from '../reducers/issues/issues.state';

const fetchIssueEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(FETCH_ISSUE)),
        filter(({ payload: { number } }) => number !== undefined),
        exhaustMap(async (action) => {
            const { number } = action.payload;
            const { data } = await client.query<IFetchIssueQuery, IFetchIssueQueryVariables>({
                query: FetchIssue,
                variables: {
                    number
                }
            });

            return fetchIssueFulfilled({ number, issue: data.repository?.issue });
        })
    );

const fetchIssuesEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(FETCH_ISSUES)),
        withLatestFrom(state$),
        switchMap(async ([action, state]) => {
            const { term, filters, more } = action.payload;

            const query = searchQueryBuilder({ term, filters });
            const after = more ? state.search.entities[query]?.pagination?.endCursor : undefined;

            const { data } = await client.query<ISearchIssuesQuery, ISearchIssuesQueryVariables>({
                query: SearchIssues,
                variables: {
                    query,
                    after
                }
            });

            const issues =
                data.search.edges
                    ?.map((edges) => edges?.node)
                    .filter((node): node is Issue => !!node && node.__typename === 'Issue') ?? [];

            let pagination: PaginationState | undefined = undefined;

            if (data.search.pageInfo.endCursor) {
                pagination = {
                    endCursor: data.search.pageInfo.endCursor,
                    hasNextPage: data.search.pageInfo.hasNextPage
                };
            }

            return fetchIssuesFulfilled({
                query,
                issues,
                pagination
            });
        })
    );

export default combineEpics(fetchIssuesEpic, fetchIssueEpic);
