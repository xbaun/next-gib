import { createSelector } from 'reselect';
import { searchQueryBuilder } from '../base/query-builder';
import { RootStateType } from '../index';

export const selectSearch = (state: RootStateType) => state.search;

export const selectSearchEntityState = (state: RootStateType) => ({
    ids: state.search.ids,
    entities: state.search.entities
});

export const selectSearchTerm = (state: RootStateType) => state.search.term;

export const selectSearchFilters = (state: RootStateType) => state.search.filters;

export const selectSearchQuery = createSelector(
    [selectSearchTerm, selectSearchFilters],
    (term, filters) =>
        searchQueryBuilder({
            term,
            filters
        })
);

export const selectHasMoreSearchResults = createSelector(
    [selectSearchQuery, selectSearchEntityState],
    (query, state) => {
        return !!state.entities[query]?.pagination?.hasNextPage;
    }
);
