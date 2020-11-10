import { createSelector } from 'reselect';
import * as Types from '../../gql/types.graphql-gen';
import { RootStateType } from '../index';
import { Issue } from '../reducers/issue.state';
import { IssueState, SearchIn } from '../reducers/search.reducer';
import { selectSearch } from './search.selectors';

export const selectIssuesState = (state: RootStateType) => state.issues;

export const selectIssueEntities = (state: RootStateType) => state.issues.entities;

export const selectIssueByIds = (ids: number[]) => (state: RootStateType) =>
    ids.map((id) => state.issues.entities[id]);

export const selectIssuesBySearch = createSelector(
    [selectSearch, selectIssuesState],
    ({ term, filters }, { ids, entities }) => {
        return ids.reduce((arr, id) => {
            let match = true;
            const entity = entities[id];

            if (filters.issueState.length > 0) {
                match =
                    match &&
                    filters.issueState.some((state) => {
                        switch (state) {
                            case IssueState.IsOpen:
                                return entity.state === Types.IssueState.Open;
                            case IssueState.IsClosed:
                                return entity.state === Types.IssueState.Closed;
                        }

                        return false;
                    });
            }

            if (filters.searchIn.length > 0 && !!term) {
                // split up string into words but preserve quoted substrings
                // https://stackoverflow.com/questions/49179609/split-string-on-spaces-and-quotes-keeping-quoted-substrings-intact
                const subterms = term
                    .match(/"[^"]*"|\S+/g)
                    ?.map((m) => (m.slice(0, 1) === '"' ? m.slice(1, -1) : m));

                match =
                    match &&
                    filters.searchIn.some((where) =>
                        subterms?.some((subterm) => {
                            switch (where) {
                                case SearchIn.Body:
                                    return !!entity.body?.includes(subterm);
                                case SearchIn.Title:
                                    return !!entity.title?.includes(subterm);
                            }
                        })
                    );
            }

            if (match) {
                arr.push(entity);
            }

            return arr;
        }, [] as Issue[]);
    }
);
