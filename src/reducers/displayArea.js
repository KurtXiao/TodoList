import { SET_DISPLAY_CONDITIONS, FILTER_DISPLAY } from '../actions/actionTypes';
import { filterEvents } from '../utils/redux';

function displayArea(state = null, action) {
    switch(action.type) {
        case SET_DISPLAY_CONDITIONS:
            if(action.content.conditions === '') return state;
            return Object.assign({}, state, action.content);
        case FILTER_DISPLAY:
            let newState = JSON.parse(JSON.stringify(state));
            let newEvents = filterEvents(newState.conditions, action.content.allEvents);
            newState.events = newEvents;
            return newState;
        default:
            return state;
    }
}

export default displayArea;