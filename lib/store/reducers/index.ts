import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer from './auth.reducer';
import { issuesReducer } from './issue.reducer';
import { searchReducer } from './search.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    issues: issuesReducer
});

export type RootStateType = StateType<typeof rootReducer>;

export default rootReducer;
