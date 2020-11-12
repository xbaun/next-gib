import { createReducer } from 'typesafe-actions';
import { upsertEntity } from '../../base/upsert-entity';
import { actions, ActionsType } from '../../index';
import { initialState, SearchState } from './search.state';

export const searchReducer = createReducer<SearchState, ActionsType>(initialState) //
    .handleAction(actions.searchIssues, (state, action) => ({
        ...state,
        ...action.payload
    }))
    .handleAction(actions.fetchIssues, (state, action) => ({
        ...state,
        fetching: true
    }))
    .handleAction(actions.fetchIssuesFulfilled, (state, action) => {
        const { query, pagination } = action.payload;

        return {
            ...upsertEntity(state, query, (entity) => ({
                ...entity,
                ...(pagination
                    ? {
                          pagination: {
                              ...entity?.pagination,
                              ...pagination
                          }
                      }
                    : undefined)
            })),
            fetching: false
        };
    });
// .handleAction(actions.fetchIssuesFulfilled, (state, action) => ({
//     ...state,
//     fetching: false
// }));
