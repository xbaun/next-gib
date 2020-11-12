import { createReducer } from 'typesafe-actions';
import { upsertEntity } from '../../base/upsert-entity';
import { actions, ActionsType } from '../../index';
import { initialState, IssuesState } from './issues.state';

export const issuesReducer = createReducer<IssuesState, ActionsType>(initialState) //
    .handleAction(actions.fetchIssue, (state, action) => {
        const { number } = action.payload;

        return upsertEntity(state, number, (entity) => ({
            ...entity,
            fetching: true,
            exists: undefined
        }));

        // const ids = [...state.ids];
        //
        // if (!ids.includes(number)) {
        //     ids.push(number);
        // }
        //
        // return {
        //     ...state,
        //     ids,
        //     entities: {
        //         ...state.entities,
        //         [number]: {
        //             ...state.entities[number],
        //             fetching: true,
        //             exists: undefined
        //         }
        //     }
        // };
    })
    .handleAction(actions.fetchIssueFulfilled, (state, action) => {
        const { number, issue } = action.payload;

        return upsertEntity(state, number, (entity) => ({
            ...entity,
            ...(issue
                ? {
                      data: {
                          ...entity?.data,
                          ...issue
                      }
                  }
                : undefined),
            fetching: false,
            exists: !!issue
        }));

        // const ids = [...state.ids];
        //
        // if (!ids.includes(number)) {
        //     ids.push(number);
        // }
        //
        // return {
        //     ...state,
        //     ids,
        //     entities: {
        //         ...state.entities,
        //         [number]: {
        //             ...state.entities[number],
        //             data: {
        //                 ...state.entities[number]?.data,
        //                 ...issue
        //             },
        //             fetching: false,
        //             exists: !!issue
        //         }
        //     }
        // };
    })
    .handleAction(actions.fetchIssuesFulfilled, (state, action) => {
        const { issues } = action.payload;

        return (
            issues?.reduce((state, issue) => {
                if (!issue) {
                    return state;
                }

                return upsertEntity(state, issue.number, (entity) => ({
                    ...entity,
                    data: {
                        ...entity?.data,
                        ...issue
                    }
                }));
            }, state) ?? state
        );

        // const newIds = action.payload.issues.map((issue) => issue.number);
        // const ids = [...state.ids];
        //
        // newIds.forEach((nextId) => !ids.includes(nextId) && ids.push(nextId));
        //
        // const entities = action.payload.issues.reduce((entity, issue) => {
        //     entity[issue.number] = {
        //         ...state.entities[issue.number],
        //         data: {
        //             ...state.entities[issue.number]?.data,
        //             ...issue
        //         }
        //     };
        //
        //     return entity;
        // }, {} as typeof state['entities']);
        //
        // return {
        //     ids,
        //     entities: {
        //         ...state.entities,
        //         ...entities
        //     }
        // };
    })
    .handleAction(actions.fetchIssueCommentsFulfilled, (state, action) => {
        const { number, pagination } = action.payload;

        return upsertEntity(state, number, (entity) => ({
            ...entity,
            ...(pagination
                ? {
                      commentsPagination: {
                          ...entity?.commentsPagination,
                          ...pagination
                      }
                  }
                : undefined)
        }));
    });
