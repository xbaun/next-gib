import { combineEpics, Epic } from 'redux-observable';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { fetchIssues } from '../actions';
import { SEARCH_ISSUES, SEARCH_MORE_ISSUES } from '../actions/search/search.action-type';
import { ActionsType, RootStateType } from '../index';

const searchIssuesEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(SEARCH_ISSUES)),
        map((action) => fetchIssues({ ...action.payload, more: false }))
    );

const searchMoreIssuesEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(SEARCH_MORE_ISSUES)),
        withLatestFrom(state$),
        map(([action, state]) => {
            return fetchIssues({
                term: state.search.term,
                filters: state.search.filters,
                more: true
            });
        })
    );

export default combineEpics(searchIssuesEpic, searchMoreIssuesEpic);
