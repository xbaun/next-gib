import { IDefaultIssueFieldsFragment } from '../../../gql/documents/issue.fragment.graphql-gen';
import { EntityState } from '../../base/entity-state';
import { PaginationState } from '../_partials/pagination.state';

export type Issue = IDefaultIssueFieldsFragment;

export interface IssueEntity {
    data?: Issue;
    fetching?: boolean;
    exists?: boolean;
    commentsPagination?: PaginationState;
}

export interface IssuesState extends EntityState<number, IssueEntity> {}

export const initialState: IssuesState = {
    ids: [],
    entities: {}
};
