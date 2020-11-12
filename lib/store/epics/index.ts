import { combineEpics } from 'redux-observable';
import authEpics from './auth.epic';
import commentEpics from './comment.epic';
import issuesEpic from './issues.epic';
import searchEpics from './search.epic';

export default combineEpics(authEpics, searchEpics, issuesEpic, commentEpics);
