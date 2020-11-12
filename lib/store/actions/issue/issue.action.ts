import { createAction } from 'typesafe-actions';
import { PaginationState } from '../../reducers/_partials/pagination.state';
import { IssueComment } from '../../reducers/comments/comments.state';
import { Issue } from '../../reducers/issues/issues.state';
import { IssueState, SearchIn } from '../../reducers/search/search.state';
import {
    FETCH_ISSUE,
    FETCH_ISSUE_COMMENTS,
    FETCH_ISSUE_COMMENTS_FULFILLED,
    FETCH_ISSUE_FULFILLED,
    FETCH_ISSUES,
    FETCH_ISSUES_FULFILLED
} from './issue.action-type';

export const fetchIssues = createAction(
    FETCH_ISSUES,
    (payload: {
        term: string;
        filters: { searchIn: SearchIn[]; issueState: IssueState[] };
        more: boolean;
    }) => payload
)();

export const fetchIssuesFulfilled = createAction(
    FETCH_ISSUES_FULFILLED,
    (payload: { query: string; issues: Issue[]; pagination?: PaginationState }) => payload
)();

export const fetchIssue = createAction(FETCH_ISSUE, (payload: { number: number }) => payload)();

export const fetchIssueFulfilled = createAction(
    FETCH_ISSUE_FULFILLED,
    (payload: { number: number; issue?: Issue | null }) => payload
)();

export const fetchIssueComments = createAction(
    FETCH_ISSUE_COMMENTS,
    (payload: { number: number; more: boolean }) => payload
)();

export const fetchIssueCommentsFulfilled = createAction(
    FETCH_ISSUE_COMMENTS_FULFILLED,
    (payload: { number: number; comments?: IssueComment[] | null; pagination?: PaginationState }) =>
        payload
)();
