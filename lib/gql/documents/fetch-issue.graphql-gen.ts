import * as Types from '../types.graphql-gen';

import { IDefaultIssueFieldsFragment, IDefaultIssueCommentFieldsFragment } from './issue.fragment.graphql-gen';
import gql from 'graphql-tag';
import { DefaultIssueFields, DefaultIssueCommentFields } from './issue.fragment.graphql-gen';
export type IFetchIssueQueryVariables = Types.Exact<{
  number: Types.Scalars['Int'];
}>;


export type IFetchIssueQuery = (
  { __typename?: 'Query' }
  & { repository?: Types.Maybe<(
    { __typename?: 'Repository' }
    & { issue?: Types.Maybe<(
      { __typename?: 'Issue' }
      & IDefaultIssueFieldsFragment
    )> }
  )> }
);

export type IFetchIssueCommentsQueryVariables = Types.Exact<{
  number: Types.Scalars['Int'];
  after?: Types.Maybe<Types.Scalars['String']>;
}>;


export type IFetchIssueCommentsQuery = (
  { __typename?: 'Query' }
  & { repository?: Types.Maybe<(
    { __typename?: 'Repository' }
    & { issue?: Types.Maybe<(
      { __typename?: 'Issue' }
      & { comments: (
        { __typename?: 'IssueCommentConnection' }
        & Pick<Types.IIssueCommentConnection, 'totalCount'>
        & { pageInfo: (
          { __typename?: 'PageInfo' }
          & Pick<Types.IPageInfo, 'endCursor' | 'hasNextPage'>
        ), nodes?: Types.Maybe<Array<Types.Maybe<(
          { __typename?: 'IssueComment' }
          & IDefaultIssueCommentFieldsFragment
        )>>> }
      ) }
    )> }
  )> }
);


export const FetchIssue = gql`
    query FetchIssue($number: Int!) {
  repository(name: "react", owner: "facebook") {
    issue(number: $number) {
      ...defaultIssueFields
    }
  }
}
    ${DefaultIssueFields}`;
export const FetchIssueComments = gql`
    query FetchIssueComments($number: Int!, $after: String) {
  repository(name: "react", owner: "facebook") {
    issue(number: $number) {
      comments(first: 10, after: $after) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          ...defaultIssueCommentFields
        }
      }
    }
  }
}
    ${DefaultIssueCommentFields}`;