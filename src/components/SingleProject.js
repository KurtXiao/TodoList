import React from 'react';
import '../styles/SingleProject.css';
import projectSign from '../images/project.png';
import deleteSign from '../images/close.png';
import store from '../store';
import { setState } from '../actions/allEvents';
import { updateState } from '../utils/server';

class SingleProject extends React.Component {
    constructor(props) {
        super(props);
    }
    async deleteProject() {
        let state = Object.assign({}, store.getState().allEvents);
        state.projects.splice(state.projects.indexOf(this.props.name), 1);
        await store.dispatch(setState(state));
        updateState();
    }
    render() {
        return <div className='single-project'>
            <img className='single-project-image' src={projectSign} />
            <span className='single-project-text'>{this.props.name}</span>
            <img className='single-project-delete' onClick={this.deleteProject.bind(this)} src={deleteSign}/>
        </div>
    }
}

export default SingleProject;