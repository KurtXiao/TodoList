import React from "react";
import '../styles/AllProjects.css';
import controlSign from '../images/control.png';
import addition from '../images/addition.png';
import projectSign from '../images/project.png';
import SingleProject from './SingleProject';
import store from "../store";
import { equalArrays } from "../utils/redux";
import { setState } from "../actions/allEvents";
import { updateState } from '../utils/server';

class AllProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAddProject: 'none',
            displayProjects: 'none',
            projects: [],
            name: '',
        }
    }
    async componentDidMount() {
        await store.subscribe(this.handleProjectsChange.bind(this));
    }
    handleProjectsChange() {
        let newProjects = store.getState().allEvents?.projects;
        if(newProjects && !equalArrays(newProjects, this.state.projects)) {
            this.setState({
                projects: [...newProjects]
            })
        }
    }
    displayAddProject() {
        this.setState({
            displayAddProject: this.state.displayAddProject === 'none' ? 'block' : 'none'
        });
    }
    displayProjects() {
        let displayVal = this.state.displayProjects === 'none' ? 'block' : 'none';
        if(this.state.projects.length === 0) displayVal = 'none';
        this.setState({
            displayProjects: displayVal
        })
    }
    getProjects(projects) {
        let arr = [];
        for(let i = 0; i < projects.length; ++i) {
            arr.push(<SingleProject key={Math.random()} name={projects[i]}/>);
        }
        return arr;
    }
    handleInputValue(e) {
        this.setState({
            name: e.target.value
        });
    }
    async addProject() {
        if(this.state.name === '') {
            alert('Project name must not be empty!');
            return;
        }
        if(store.getState().allEvents.projects.indexOf(this.state.name) !== -1) {
            alert('Repeated project name!');
            return;
        }
        let state = Object.assign({}, store.getState().allEvents);
        state.projects.push(this.state.name);
        await store.dispatch(setState(state));
        this.setState({
            displayAddProject: 'none',
            name: ''
        });
        updateState();
    }
    render() {
        return <div className="project-controller">
            <div className="addition">
                <img className="addition-arrow" src={controlSign} onClick={this.displayProjects.bind(this)}/>
                <span className="addition-text" onClick={this.displayProjects.bind(this)}>Projects</span>
                <img className="addition-sign" src={addition} onClick={this.displayAddProject.bind(this)}/>
            </div>
            <div className="single-label-wrapper" style={{display: this.state.displayProjects}}>
                {this.getProjects(this.state.projects)}
            </div>
            <div className='add-project' style={{display: this.state.displayAddProject}}>
                <img className='add-project-image' src={projectSign}/>
                <input value={this.state.name} className='add-project-name' onChange={this.handleInputValue.bind(this)}/>
                <button onClick={this.addProject.bind(this)} className='add-project-confirm'>确认</button>
            </div>
        </div>;
    }
}

export default AllProjects;