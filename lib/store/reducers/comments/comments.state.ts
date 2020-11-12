import { IDefaultIssueCommentFieldsFragment } from '../../../gql/documents/issue.fragment.graphql-gen';
import { EntityState } from '../../base/entity-state';

export type IssueComment = IDefaultIssueCommentFieldsFragment;

export interface IssueCommentEntity {
    data?: IssueComment;
}

export interface CommentsState extends EntityState<string, IssueCommentEntity> {}

export const initialState: CommentsState = {
    ids: [],
    entities: {}
};
