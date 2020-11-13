import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient } from '@apollo/client/core';
import { mockSingleLink } from '@apollo/client/testing';
import { DocumentNode } from 'graphql';
import { ISearchIssuesQuery, SearchIssues } from '../gql/documents/search-issues.graphql-gen';
import { store } from '../store';
import { fetchIssues } from '../store/actions';
import { IssueState, SearchIn } from '../store/reducers/search/search.state';
import data from './fetch-issue.data.json';
import { waitImmediate } from './utils/wait-immediate';

// Custom mock client factory to preserve __typename in result by setting `addTypename` to true in InMemoryCache.
// See https://github.com/apollographql/apollo-client/blob/main/src/utilities/testing/mocking/mockClient.ts
function createMockClient<TData>(data: TData, query: DocumentNode, variables?: {}) {
    if (variables === void 0) {
        variables = {};
    }
    return new ApolloClient({
        link: mockSingleLink({
            request: { query: query, variables: variables },
            result: { data: data }
        }).setOnError(function (error) {
            throw error;
        }),
        cache: new InMemoryCache({ addTypename: true })
    });
}

describe('Store', () => {
    const query = jest.spyOn(require('../gql/client').client, 'query');
    const clientMock = createMockClient<ISearchIssuesQuery>(
        data as ISearchIssuesQuery,
        SearchIssues,
        {
            query: 'repo:facebook/react type:issue react in:body in:title is:open is:closed',
            after: undefined
        }
    );

    query.mockImplementation((args: any) => clientMock.query(args));

    it('should fetch new issues for action "fetchIssues"', async () => {
        await store.dispatch(
            fetchIssues({
                term: 'react',
                filters: {
                    issueState: [IssueState.IsOpen, IssueState.IsClosed],
                    searchIn: [SearchIn.Body, SearchIn.Title]
                },
                more: false
            })
        );

        // Enqueue at the end of the current event loop to trigger epics first.
        await waitImmediate();

        expect(store.getState().issues.entities[20175].data).toEqual(data.search.edges[0].node);
    });
});
