import { createAction } from '@reduxjs/toolkit';
import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { fetchReposBySearchTerm, SetSearchRepoTerm, setSearchRepoTerm } from './search-repo.slice';
//
//
// export const fetchUserAccessToken = createAction<{ code: string }>('fetchUserAccessToken');
// export type  FetchUserAccessToken = ReturnType<typeof fetchUserAccessToken>;
//
//
// const epic = (action$: ActionsObservable<FetchUserAccessToken>) => action$.pipe(
//     ofType<FetchUserAccessToken>(fetchUserAccessToken.type),
//     map((action) => fetchUserAccessToken({ code: ""}))
// );
//




const fetchReposBySearchTermEpic = (action$: ActionsObservable<SetSearchRepoTerm>) => action$.pipe(
    ofType<SetSearchRepoTerm>(setSearchRepoTerm.type),
    map((action) => fetchReposBySearchTerm({ term: action.payload.term}))
);


export const rootEpic = combineEpics(
    fetchReposBySearchTermEpic
);
