import fetch from 'isomorphic-unfetch';
import { combineEpics, Epic } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { isBrowser } from '../../utils';
import { fetchAccessTokenFulfilled } from '../actions';
import {
    AUTH__FETCH_ACCESS_TOKEN,
    AUTH__FETCH_ACCESS_TOKEN_FROM_CACHE
} from '../actions/auth/auth.action-type';
import { ActionsType, RootStateType } from '../index';

const fetchAccessTokenFromCacheEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(AUTH__FETCH_ACCESS_TOKEN_FROM_CACHE)),
        switchMap((action) => {
            if (!isBrowser()) {
                return EMPTY;
            }

            const value = localStorage.getItem('auth');

            if (value) {
                try {
                    const payload = JSON.parse(value);

                    return of(
                        fetchAccessTokenFulfilled({
                            error: false,
                            ...payload
                        })
                    );
                } catch {
                    return EMPTY;
                }
            }

            return EMPTY;
        })
    );

const fetchAccessTokenEpic: Epic<ActionsType, ActionsType, RootStateType> = (action$) =>
    action$.pipe(
        filter(isOfType(AUTH__FETCH_ACCESS_TOKEN)),
        switchMap(async ({ payload: { code } }) => {
            const url = new URL('/api/auth/github', location.href);
            url.searchParams.append('code', code);

            const data = await fetch(url.toString()).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return undefined;
                }
            });

            if (data && 'accessToken' in data && data.accessToken) {
                const payload = {
                    token: data.accessToken,
                    profile: data.profile
                };

                // save new token to cache
                if (isBrowser()) {
                    localStorage.setItem('auth', JSON.stringify(payload));
                }

                return fetchAccessTokenFulfilled({
                    error: false,
                    ...payload
                });
            } else {
                return fetchAccessTokenFulfilled({
                    error: true,
                    token: undefined,
                    profile: undefined
                });
            }
        })
    );

export default combineEpics(fetchAccessTokenFromCacheEpic, fetchAccessTokenEpic);
