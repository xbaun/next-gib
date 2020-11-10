import { combineEpics, Epic } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { fetchIssues } from '../actions';
import { SEARCH__ISSUES } from '../actions/search/search.action-type';
import { ActionsType, RootStateType } from '../index';

const searchIssuesEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(SEARCH__ISSUES)),
        map((action) => fetchIssues(action.payload))
    );

export default combineEpics(searchIssuesEpic);
