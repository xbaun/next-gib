export interface EntityState<TId extends string | number, TEntity> {
    ids: TId[];
    entities: { [K in TId]: TEntity };
}
