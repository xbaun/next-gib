import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import authReducer from './auth.slice'
import { rootEpic } from './epics';
import searchRepoReducer from './search-repo.slice'

const epicMiddleware = createEpicMiddleware();

const store =  configureStore({
    reducer: {
        auth: authReducer,
        searchRepo: searchRepoReducer
    },
    middleware: getDefaultMiddleware().concat([epicMiddleware]),
    devTools: true
});

epicMiddleware.run(rootEpic as any);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppThunkAPI =  {
    dispatch: AppDispatch
    state: RootState
}

export default store;



