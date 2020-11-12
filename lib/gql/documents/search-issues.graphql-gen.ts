import * as Types from '../types.graphql-gen';

import { IDefaultIssueFieldsFragment, IDefaultIssueCommentFieldsFragment } from './issue.fragment.graphql-gen';
import gql from 'graphql-tag';
import { DefaultIssueFields, DefaultIssueCommentFields } from './issue.fragment.graphql-gen';
export type ISearchIssuesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  after?: Types.Maybe<Types.Scalars['String']>;
}>;


export type ISearchIssuesQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'SearchResultItemConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.IPageInfo, 'endCursor' | 'hasNextPage'>
    ), edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'SearchResultItemEdge' }
      & { node?: Types.Maybe<{ __typename?: 'App' } | (
        { __typename?: 'Issue' }
        & IDefaultIssueFieldsFragment
      ) | { __typename?: 'MarketplaceListing' } | { __typename?: 'Organization' } | { __typename?: 'PullRequest' } | { __typename?: 'Repository' } | { __typename?: 'User' }> }
    )>>> }
  ) }
);


export const SearchIssues = gql`
    query SearchIssues($query: String!, $after: String) {
  search(query: $query, type: ISSUE, first: 10, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Issue {
          ...defaultIssueFields
        }
      }
    }
  }
}
    ${DefaultIssueFields}`;