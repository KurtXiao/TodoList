import React from "react";
import controlSign from '../images/control.png';
import filterIcon from '../images/filter.png';
import SingleProjectSelection from './SingleProjectSelection';
import store from "../store";
import { equalArrays } from "../utils/redux";


class SelectProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayProjectSelection: 'none',
            projects: [],
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
    getProjects(projects) {
        let arr = [];
        for(let i = 0; i < projects.length; ++i) {
            arr.push(<SingleProjectSelection key={Math.random()} name={projects[i]} displayProjectSelection={this.displayProjectSelection.bind(this)}/>);
        }
        return arr;
    }
    displayProjectSelection() {
        this.setState({
            displayProjectSelection: this.state.displayProjectSelection === 'none' ? 'block' : 'none'
        });
    }
    render() {
        return <div className="project-selector">
            <div className="addition" onClick={this.displayProjectSelection.bind(this)}>
                <img className="addition-arrow" src={controlSign}/>
                <span className="addition-text">Select Project</span>
                <img className='event-adder-img' src={filterIcon}></img>
            </div>
            <div className="single-label-wrapper" style={{display: this.state.displayProjectSelection}}>
                {this.getProjects(this.state.projects)}
            </div>
        </div>;
    }
}

export default SelectProject;