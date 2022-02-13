import React, { useState, useEffect } from "react";
import store from "../store";
import { equalArrays } from "../utils/redux";

const EventProjectSelection = (props) => {
    const [state, setState] = useState({
        projects: store.getState()?.allEvents?.projects || [],
    });
    function handleProjectsChange() {
        if(!store.getState().allEvents) return;
        let newProjects = store.getState().allEvents.projects;
        if(!equalArrays(state.projects, newProjects)) {
            setState({
                projects: [...newProjects]
            });
        }
    }
    useEffect(() => {
        let unsubscribe = store.subscribe(handleProjectsChange);
        return () => unsubscribe();
    })
    let arr = [];
    for(let i = 0; i < state.projects.length; ++i) {
        arr.push(
        <div className='option'>
            <span className='option-name'>
                {state.projects[i]}
            </span>
            <input type="checkbox" name={state.projects[i]} className='option-check' checked={props.activeProjects.indexOf(state.projects[i]) !== -1} onChange={props.setActiveProjects}/>
        </div>);
    }
    return <div className='options-wrapper' style={{display: props.display}}>
        {arr}
    </div>;
}

export default EventProjectSelection;