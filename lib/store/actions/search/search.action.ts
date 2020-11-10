import { createAction } from 'typesafe-actions';
import { IssueState, SearchIn } from '../../reducers/search.reducer';
import { SEARCH__ISSUES } from './search.action-type';

export const searchIssues = createAction(
    SEARCH__ISSUES,
    (payload: { term: string; filters: { searchIn: SearchIn[]; issueState: IssueState[] } }) =>
        payload
)();
