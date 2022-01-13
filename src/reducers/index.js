import { combineReducers } from 'redux';
import allEvents from './allEvents';
import displayArea from './displayArea';
import projectArea from './projectArea';
import userInfo from './userInfo';

export const reducer = combineReducers({
    allEvents,
    displayArea,
    projectArea,
    userInfo,
});