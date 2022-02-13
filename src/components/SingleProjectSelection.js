import React from 'react';
import projectSign from '../images/project.png';
import store from '../store';
import { selectProject, filterProject } from '../actions/projectArea';

const SingleProject = (props) => {
    async function mySelectProject() {
        props.displayProjectSelection();
        await store.dispatch(selectProject(props.name));
        await store.dispatch(filterProject(store.getState().allEvents.events));
    }
    return <div className='single-project' onClick={() => mySelectProject()}>
            <img className='single-project-image' src={projectSign} />
            <span className='single-project-text'>{props.name}</span>
        </div>;
}

export default SingleProject;