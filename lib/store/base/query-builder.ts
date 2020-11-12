import { SearchIssuesPayload } from '../actions';
import { IssueState, SearchIn } from '../reducers/search/search.state';

export const searchQueryBuilder = (args: SearchIssuesPayload) => {
    const { term, filters } = args;

    let query = `repo:facebook/react type:issue ${term}`;

    filters.searchIn.forEach((value) => {
        switch (value) {
            case SearchIn.Body:
                query += ' in:body';
                break;
            case SearchIn.Title:
                query += ' in:title';
                break;
        }
    });

    filters.issueState.forEach((value) => {
        switch (value) {
            case IssueState.IsOpen:
                query += ' is:open';
                break;
            case IssueState.IsClosed:
                query += ' is:closed';
                break;
        }
    });

    return query;
};
