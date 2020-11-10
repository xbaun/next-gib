import { createReducer } from 'typesafe-actions';
import { actions, ActionsType } from '../index';

export enum SearchIn {
    Title = 'TITLE',
    Body = 'BODY'
}

export enum IssueState {
    IsOpen = 'IS_OPEN',
    IsClosed = 'IS_CLOSED'
}

export interface SearchState {
    term: string;
    filters: {
        searchIn: SearchIn[];
        issueState: IssueState[];
    };
    results: number[];
    fetching: boolean;
}

export const initialState: SearchState = {
    term: '',
    filters: {
        searchIn: [SearchIn.Body, SearchIn.Title],
        issueState: [IssueState.IsOpen, IssueState.IsClosed]
    },
    results: [],
    fetching: false
};

export const searchReducer = createReducer<SearchState, ActionsType>(initialState) //
    .handleAction(actions.searchIssues, (state, action) => ({
        ...state,
        ...action.payload
    }))
    .handleAction(actions.fetchIssues, (state, action) => ({
        ...state,
        fetching: true
    }))
    .handleAction(actions.fetchIssuesFulfilled, (state, action) => ({
        ...state,
        fetching: false
    }));
