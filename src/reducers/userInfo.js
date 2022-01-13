import { SET_USERNAME } from '../actions/actionTypes';

function userInfo(state = null, action) {
    switch(action.type) {
        case SET_USERNAME:
            return Object.assign({}, state, action.content);
        default:
            return state;
    }
}

export default userInfo;