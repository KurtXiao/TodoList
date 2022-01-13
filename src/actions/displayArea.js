import { SET_DISPLAY_CONDITIONS, FILTER_DISPLAY } from './actionTypes';

export function setDisplayConditions(conditions) {
    return {
        type: SET_DISPLAY_CONDITIONS,
        content: {
            conditions: conditions
        }
    }
}

export function filterDisplayEvents(allEvents) {
    return {
        type: FILTER_DISPLAY,
        content: {
            allEvents: allEvents,
        }
    }
}