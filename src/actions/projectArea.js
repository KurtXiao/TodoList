import { SELECT_PROJECT, FILTER_PROJECT } from './actionTypes';

export function selectProject(project) {
    return {
        type: SELECT_PROJECT,
        content: {
            conditions: {activeProjects: [project]}
        }
    }
}

export function filterProject(allEvents) {
    return {
        type: FILTER_PROJECT,
        content: {
            allEvents: allEvents,
        }
    }
}