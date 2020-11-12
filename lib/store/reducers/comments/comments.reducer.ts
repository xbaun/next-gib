import { createReducer } from 'typesafe-actions';
import { upsertEntity } from '../../base/upsert-entity';
import { actions, ActionsType } from '../../index';
import { CommentsState, initialState } from './comments.state';

export const commentsReducer = createReducer<CommentsState, ActionsType>(initialState) //
    .handleAction(actions.fetchIssueCommentsFulfilled, (state, action) => {
        const { comments } = action.payload;

        return (
            comments?.reduce(
                (state, comment) =>
                    upsertEntity(state, comment.id, (entity) => ({
                        ...entity,
                        data: {
                            ...entity?.data,
                            ...comment
                        }
                    })),
                state
            ) ?? state
        );

        // return {
        //     ...(comments?.reduce(
        //         (state, comment) =>
        //             upsertEntity(state, comment.id, (entity) => ({
        //                 ...entity,
        //                 data: {
        //                     ...entity?.data,
        //                     ...comment
        //                 }
        //             })),
        //         state
        //     ) ?? state)
        //     // pagination: endCursor
        //     //     ? {
        //     //           forId: number,
        //     //           after: endCursor
        //     //       }
        //     //     : undefined
        // };

        // let newState =
        //     comments?.reduce(
        //         (state, comment) =>
        //             upsertEntity(state, comment.id, (entity) => ({
        //                 ...entity,
        //                 data: {
        //                     ...entity?.data,
        //                     ...comment
        //                 }
        //             })),
        //         state
        //     ) ?? state;
        //
        // if (endCursor) {
        //     newState = {
        //         ...newState,
        //         pagination: {
        //             forId: number,
        //             after
        //         }
        //     }
        // }
        //
        // return newState;
    });
