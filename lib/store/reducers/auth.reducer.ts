import { createReducer } from 'typesafe-actions';
import { actions, ActionsType } from '../index';

export interface AuthState {
    token: string | undefined;
    error: boolean;
    authenticating: boolean;
    profile:
        | {
              id: string;
              displayName: string;
              photos?: { value: string }[];
          }
        | undefined;
}

export const initialState: AuthState = {
    token: undefined,
    error: false,
    authenticating: false,
    profile: undefined
};

export const authReducer = createReducer<AuthState, ActionsType>(initialState) //
    .handleAction(actions.fetchAccessToken, (state, action) => ({
        ...state,
        authenticating: true,
        error: false
    }))
    .handleAction(actions.fetchAccessTokenFulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        authenticating: false
    }));

export default authReducer;
