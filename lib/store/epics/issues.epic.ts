import { combineEpics, Epic } from 'redux-observable';
import { filter, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { client } from '../../gql/client';
import {
    ISearchIssuesQuery,
    ISearchIssuesQueryVariables,
    SearchIssues
} from '../../gql/documents/search-issues.graphql-gen';
import { fetchIssuesFulfilled } from '../actions';
import { FETCH_ISSUES } from '../actions/issue/issue.action-type';
import { ActionsType, RootStateType } from '../index';
import { Issue } from '../reducers/issue.state';
import { IssueState, SearchIn } from '../reducers/search.reducer';

const fetchIssuesEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(FETCH_ISSUES)),
        switchMap(async (action) => {
            let query = `repo:facebook/react ${action.payload.term}`;

            action.payload.filters.searchIn.forEach((value) => {
                switch (value) {
                    case SearchIn.Body:
                        query += ' in:body';
                        break;
                    case SearchIn.Title:
                        query += ' in:title';
                        break;
                }
            });

            action.payload.filters.issueState.forEach((value) => {
                switch (value) {
                    case IssueState.IsOpen:
                        query += ' is:open';
                        break;
                    case IssueState.IsClosed:
                        query += ' is:closed';
                        break;
                }
            });

            const { data } = await client.query<ISearchIssuesQuery, ISearchIssuesQueryVariables>({
                query: SearchIssues,
                variables: {
                    query
                }
            });

            const issues =
                data.search.edges
                    ?.map((edges) => edges?.node)
                    .filter((node): node is Issue => !!node && node.__typename === 'Issue') ?? [];

            return fetchIssuesFulfilled({ issues });
        })
    );

export default combineEpics(fetchIssuesEpic);
