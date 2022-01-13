import { SET_STATE, UPDATE_EVENT } from '../actions/actionTypes';

function allEvents(state = null, action) {
    switch(action.type) {
        case SET_STATE:
            return Object.assign({}, state, action.obj);
        case UPDATE_EVENT:
            let newState = JSON.parse(JSON.stringify(state));
            newState.events[action.content.eventIndex] = action.content.event;
            return newState;
        default:
            return state;
    }
}

export default allEvents;