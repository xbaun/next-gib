import * as Types from '../types.graphql-gen';

import gql from 'graphql-tag';
export type IDefaultIssueFieldsFragment = (
  { __typename?: 'Issue' }
  & Pick<Types.IIssue, 'number' | 'url' | 'state' | 'publishedAt' | 'closed' | 'closedAt' | 'updatedAt' | 'title' | 'body' | 'bodyHTML'>
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
  )>, labels?: Types.Maybe<(
    { __typename?: 'LabelConnection' }
    & { nodes?: Types.Maybe<Array<Types.Maybe<(
      { __typename?: 'Label' }
      & Pick<Types.ILabel, 'id' | 'name'>
    )>>> }
  )> }
);

export type IDefaultIssueCommentFieldsFragment = (
  { __typename?: 'IssueComment' }
  & Pick<Types.IIssueComment, 'id' | 'bodyHTML' | 'publishedAt'>
  & { issue: (
    { __typename?: 'Issue' }
    & Pick<Types.IIssue, 'number'>
  ), author?: Types.Maybe<(
    { __typename?: 'Bot' }
    & Pick<Types.IBot, 'login' | 'avatarUrl'>
  ) | (
    { __typename?: 'EnterpriseUserAccount' }
    & Pick<Types.IEnterpriseUserAccount, 'login' | 'avatarUrl'>
  ) | (
    { __typename?: 'Mannequin' }
    & Pick<Types.IMannequin, 'login' | 'avatarUrl'>
  ) | (
    { __typename?: 'Organization' }
    & Pick<Types.IOrganization, 'login' | 'avatarUrl'>
  ) | (
    { __typename?: 'User' }
    & Pick<Types.IUser, 'login' | 'avatarUrl'>
  )> }
);

export const DefaultIssueFields = gql`
    fragment defaultIssueFields on Issue {
  number
  url
  state
  publishedAt
  closed
  closedAt
  updatedAt
  title
  body
  bodyHTML
  author {
    avatarUrl
    login
  }
  labels(first: 10) {
    nodes {
      id
      name
    }
  }
}
    `;
export const DefaultIssueCommentFields = gql`
    fragment defaultIssueCommentFields on IssueComment {
  id
  bodyHTML
  publishedAt
  issue {
    number
  }
  author {
    login
    avatarUrl
  }
}
    `;