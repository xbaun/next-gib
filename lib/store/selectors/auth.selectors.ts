import { RootStateType } from '../index';

export const getAuth = (state: RootStateType) => state.auth;
export const getAuthToken = (state: RootStateType) => state.auth.token;
