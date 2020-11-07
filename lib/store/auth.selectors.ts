import { RootState } from './index';

export const getAuth = (state: RootState) => state.auth;
export const getAuthToken = (state: RootState) => state.auth.token;
