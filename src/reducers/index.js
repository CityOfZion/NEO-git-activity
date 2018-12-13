import { combineReducers } from "redux";
import Project from './Project';
import User from './User';
import Commit from './Commit';

const reducers = combineReducers({
    Project,
    User,
    Commit,
});

export default reducers;