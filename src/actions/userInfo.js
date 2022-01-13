import {
    SET_USERNAME
} from './actionTypes';

export function setUsername(username) {
    return {
        type: SET_USERNAME,
        content: {
            username: username
        }
    }
}