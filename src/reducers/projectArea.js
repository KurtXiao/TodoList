import { SELECT_PROJECT, FILTER_PROJECT } from '../actions/actionTypes';
import { filterEvents } from '../utils/redux';

function projectArea(state = null, action) {
    switch(action.type) {
        case SELECT_PROJECT:
            if(action.content.conditions === '') return state;
            return Object.assign({}, state, action.content);
        case FILTER_PROJECT:
            let newState = JSON.parse(JSON.stringify(state));
            let newEvents = filterEvents(newState.conditions, action.content.allEvents);
            newState.events = newEvents;
            return newState;
        default:
            return state;
    }
}

export default projectArea;