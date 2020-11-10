import * as Types from '../types.graphql-gen';

import gql from 'graphql-tag';
export type ISearchIssuesQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type ISearchIssuesQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'SearchResultItemConnection' }
    & { edges?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'SearchResultItemEdge' }
      & { node?: Types.Maybe<{ __typename?: 'App' } | (
        { __typename: 'Issue' }
        & Pick<Types.IIssue, 'number' | 'url' | 'state' | 'publishedAt' | 'closed' | 'closedAt' | 'updatedAt' | 'title' | 'body'>
        & { author?: Types.Maybe<(
          { __typename?: 'Bot' }
          & Pick<Types.IBot, 'avatarUrl' | 'login'>
        ) | (
          { __typename?: 'EnterpriseUserAccount' }
          & Pick<Types.IEnterpriseUserAccount, 'avatarUrl' | 'login'>
        ) | (
          { __typename?: 'Mannequin' }
          & Pick<Types.IMannequin, 'avatarUrl' | 'login'>
        ) | (
          { __typename?: 'Organization' }
          & Pick<Types.IOrganization, 'avatarUrl' | 'login'>
        ) | (
          { __typename?: 'User' }
          & Pick<Types.IUser, 'avatarUrl' | 'login'>
        )> }
      ) | { __typename?: 'MarketplaceListing' } | { __typename?: 'Organization' } | { __typename?: 'PullRequest' } | { __typename?: 'Repository' } | { __typename?: 'User' }> }
    )>>> }
  ) }
);


export const SearchIssues = gql`
    query SearchIssues($query: String!) {
  search(query: $query, type: ISSUE, first: 10) {
    edges {
      node {
        ... on Issue {
          __typename
          number
          url
          author {
            avatarUrl
            login
          }
          state
          publishedAt
          closed
          closedAt
          updatedAt
          title
          body
        }
      }
    }
  }
}
    `;