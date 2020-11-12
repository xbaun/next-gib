import { createAction } from 'typesafe-actions';
import { IssueState, SearchIn } from '../../reducers/search/search.state';
import { SEARCH_ISSUES, SEARCH_MORE_ISSUES } from './search.action-type';

export interface SearchIssuesPayload {
    term: string;
    filters: { searchIn: SearchIn[]; issueState: IssueState[] };
}

export const searchIssues = createAction(
    SEARCH_ISSUES,
    (payload: SearchIssuesPayload) => payload
)();

export const searchMoreIssues = createAction(SEARCH_MORE_ISSUES)();
