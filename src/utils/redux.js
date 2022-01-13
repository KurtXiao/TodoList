import store from '../store';
import { setState } from '../actions/allEvents';
import SingleEvent from '../components/SingleEvent';

export function getState(str) {
    if(str[0] !== '"') return JSON.parse(str);
    return JSON.parse(str.slice(1, -1));
}

export function equalArrays(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx]);
}

export async function addEvent(title, text, activeDate, activeLabels, activeProjects, activePriority) {
    let processedLabels = [];
    let allLabels = store.getState().allEvents.labels;
    for(let i = 0; i < activeLabels.length; ++i) {
        if(allLabels.indexOf(activeLabels[i]) !== -1) processedLabels.push(activeLabels[i]);
    }
    let processedProjects = [];
    let allProjects = store.getState().allEvents.projects;
    for(let i = 0; i < activeProjects.length; ++i) {
        if(allProjects.indexOf(activeProjects[i]) !== -1) processedProjects.push(activeProjects[i]);
    }
    let newEvent = {
        title: title,
        text: text,
        activeDate: activeDate,
        activeLabels: processedLabels,
        activeProjects: processedProjects,
        activePriority: activePriority,
    }
    let state = JSON.parse(JSON.stringify(store.getState().allEvents));
    state.events.push(newEvent);
    await store.dispatch(setState(state));
}

export function getDisplayEvents(eventsArr) {
    let res = [];
    for(let eventObj of eventsArr) {
        res.push(<SingleEvent 
            key={Math.random()}
            eventIndex={eventObj.eventIndex} 
            title={eventObj.title} 
            text={eventObj.text} 
            activeDate={[...eventObj.activeDate]}
            activeLabels={[...eventObj.activeLabels]}
            activeProjects={[...eventObj.activeProjects]}
            activePriority={eventObj.activePriority}/>)
    }

    return res;
}

function isSubArray(sourceArr, subArr) {
    for(let i = 0; i < subArr.length; ++i) {
        if(sourceArr.indexOf(subArr[i]) === -1) return false;
    }
    return true;
}

function fulfill(event, conditions) {
    for(let i in conditions) {
        if(i === 'activeDate') {
            if(!equalArrays(event.activeDate, conditions[i])) return false;
        }
        else if(i === 'activeLabels') {
            if(!isSubArray(event.activeLabels, conditions[i])) return false;
        }
        else if(i === 'activeProjects') {
            if(!isSubArray(event.activeProjects, conditions[i])) return false;
        }
        else if(i === 'activePriority') {
            if(event.activePriority !== conditions[i]) return false;
        }
    }
    return true;
}

export function filterEvents(conditions, allEvents) {
    let res = [];
    let sourceEvents = [...allEvents];
    let length = sourceEvents.length;
    for(let i = 0; i < length; ++i) {
        if(fulfill(sourceEvents[i], conditions)) {
            let tmp = Object.assign({}, sourceEvents[i]);
            tmp.eventIndex = i;
            res.push(tmp);
        }
    }
    return res;
}