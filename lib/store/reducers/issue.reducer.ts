import { createReducer } from 'typesafe-actions';
import { actions, ActionsType } from '../index';
import { initialState, IssuesState } from './issue.state';

export const issuesReducer = createReducer<IssuesState, ActionsType>(initialState) //
    .handleAction(actions.fetchIssuesFulfilled, (state, action) => {
        const newIds = action.payload.issues.map((issue) => issue.number);
        const ids = [...state.ids];

        newIds.forEach((nextId) => !ids.includes(nextId) && ids.push(nextId));

        const entities = action.payload.issues.reduce(
            (state, issue) => ((state[issue.number] = issue), state),
            {} as typeof state['entities']
        );

        return {
            ids,
            entities: {
                ...state.entities,
                ...entities
            }
        };
    });
