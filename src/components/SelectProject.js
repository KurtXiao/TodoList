import React, { useState, useEffect } from "react";
import controlSign from '../images/control.png';
import filterIcon from '../images/filter.png';
import SingleProjectSelection from './SingleProjectSelection';
import store from "../store";
import { equalArrays } from "../utils/redux";

const SelectProject = () => {
    const [state, setState] = useState({
        displayProjectSelection: 'none',
        projects: [],
    });
    function handleProjectsChange() {
        let newProjects = store.getState().allEvents?.projects;
        if(newProjects && !equalArrays(newProjects, state.projects)) {
            setState({
                displayProjectSelection: state.displayProjectSelection,
                projects: [...newProjects]
            })
        }
    }
    function getProjects(projects) {
        let arr = [];
        for(let i = 0; i < projects.length; ++i) {
            arr.push(<SingleProjectSelection key={Math.random()} name={projects[i]} displayProjectSelection={displayProjectSelection}/>);
        }
        return arr;
    }
    function displayProjectSelection() {
        setState({
            displayProjectSelection: state.displayProjectSelection === 'none' ? 'block' : 'none',
            projects: state.projects
        });
    }
    useEffect(async() => {
        let unsubscribe = await store.subscribe(handleProjectsChange);
        return () => unsubscribe();
    })
    return <div className="project-selector">
        <div className="addition" onClick={() => displayProjectSelection()}>
            <img className="addition-arrow" src={controlSign}/>
            <span className="addition-text">Select Project</span>
            <img className='event-adder-img' src={filterIcon}></img>
        </div>
        <div className="single-label-wrapper" style={{display: state.displayProjectSelection}}>
            {getProjects(state.projects)}
        </div>
    </div>;
}

export default SelectProject;