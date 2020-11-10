import { ISearchIssuesQuery } from '../../gql/documents/search-issues.graphql-gen';
import * as Types from '../../gql/types.graphql-gen';

export type Issue = Exclude<
    Exclude<ISearchIssuesQuery['search']['edges'], null | undefined>[number],
    null
>['node'] &
    Types.IIssue;

export interface IssuesState {
    ids: number[];
    entities: {
        [N: number]: Issue;
    };
}

export const initialState: IssuesState = {
    ids: [],
    entities: {}
};
