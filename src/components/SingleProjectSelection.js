import React from 'react';
import projectSign from '../images/project.png';
import store from '../store';
import { selectProject, filterProject } from '../actions/projectArea';

class SingleProject extends React.Component {
    constructor(props) {
        super(props);
    }
    async selectProject() {
        this.props.displayProjectSelection();
        await store.dispatch(selectProject(this.props.name));
        await store.dispatch(filterProject(store.getState().allEvents.events));
    }
    render() {
        return <div className='single-project' onClick={this.selectProject.bind(this)}>
            <img className='single-project-image' src={projectSign} />
            <span className='single-project-text'>{this.props.name}</span>
        </div>
    }
}

export default SingleProject;