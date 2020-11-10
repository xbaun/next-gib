import { createAction } from 'typesafe-actions';
import {
    AUTH__FETCH_ACCESS_TOKEN,
    AUTH__FETCH_ACCESS_TOKEN_FROM_CACHE,
    AUTH__FETCH_ACCESS_TOKEN_FULFILLED
} from './auth.action-type';

export const fetchAccessTokenFromCache = createAction(AUTH__FETCH_ACCESS_TOKEN_FROM_CACHE)();

export const fetchAccessToken = createAction(
    AUTH__FETCH_ACCESS_TOKEN,
    (payload: { code: string }) => payload
)();

export const fetchAccessTokenFulfilled = createAction(
    AUTH__FETCH_ACCESS_TOKEN_FULFILLED,
    (payload: { token?: string; profile?: any; error: boolean }) => payload
)();
