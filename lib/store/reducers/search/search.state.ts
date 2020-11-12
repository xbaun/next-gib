import { EntityState } from '../../base/entity-state';
import { PaginationState } from '../_partials/pagination.state';

export enum SearchIn {
    Title = 'TITLE',
    Body = 'BODY'
}

export enum IssueState {
    IsOpen = 'IS_OPEN',
    IsClosed = 'IS_CLOSED'
}

export interface SearchEntity {
    pagination?: PaginationState;
}

export interface SearchState extends EntityState<string, SearchEntity> {
    term: string;
    filters: {
        searchIn: SearchIn[];
        issueState: IssueState[];
    };
    fetching: boolean;
}

export const initialState: SearchState = {
    term: '',
    filters: {
        searchIn: [SearchIn.Body, SearchIn.Title],
        issueState: [IssueState.IsOpen, IssueState.IsClosed]
    },
    fetching: false,
    ids: [],
    entities: {}
};
