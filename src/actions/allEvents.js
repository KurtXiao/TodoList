import { SET_STATE, UPDATE_EVENT } from './actionTypes';

export function setState(obj) {
    return {
        type: SET_STATE,
        obj
    }
}

export function updateEvent(event, eventIndex) {
    return {
        type: UPDATE_EVENT,
        content: {
            event: event,
            eventIndex: eventIndex,
        }
    }
}