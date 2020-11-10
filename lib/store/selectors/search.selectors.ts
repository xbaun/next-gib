import { RootStateType } from '../index';

export const selectSearch = (state: RootStateType) => state.search;
export const selectSearchFilters = (state: RootStateType) => state.search.filters;
export const selectSearchResults = (state: RootStateType) => state.search.results;
