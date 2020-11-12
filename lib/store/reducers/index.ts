import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import authReducer from './auth.reducer';
import { commentsReducer } from './comments/comments.reducer';
import { issuesReducer } from './issues/issues.reducer';
import { searchReducer } from './search/search.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    search: searchReducer,
    issues: issuesReducer,
    issueComments: commentsReducer
});

export type RootStateType = StateType<typeof rootReducer>;

export default rootReducer;
