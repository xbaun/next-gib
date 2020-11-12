import { EntityState } from './entity-state';

export const upsertEntity = <
    TId extends string | number,
    TEntity,
    TState extends EntityState<TId, TEntity> = EntityState<TId, TEntity>
>(
    state: TState,
    id: TId,
    upsert: (entity?: TEntity) => TEntity
) => {
    const ids = [...state.ids];

    if (!ids.includes(id)) {
        ids.push(id);
    }

    return {
        ...state,
        ids,
        entities: {
            ...state.entities,
            [id]: {
                ...upsert(state.entities[id])
            }
        }
    };
};
