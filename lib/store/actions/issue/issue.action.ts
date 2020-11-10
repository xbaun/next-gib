import { createAction } from 'typesafe-actions';
import { Issue } from '../../reducers/issue.state';
import { IssueState, SearchIn } from '../../reducers/search.reducer';
import { FETCH_ISSUES, FETCH_ISSUES_FULFILLED } from './issue.action-type';

export const fetchIssues = createAction(
    FETCH_ISSUES,
    (payload: { term: string; filters: { searchIn: SearchIn[]; issueState: IssueState[] } }) =>
        payload
)();

export const fetchIssuesFulfilled = createAction(
    FETCH_ISSUES_FULFILLED,
    (payload: { issues: Issue[] }) => payload
)();
