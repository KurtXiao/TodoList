import React from "react";
import store from "../store";
import { equalArrays } from "../utils/redux";

class EventProjectSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: store.getState().allEvents.projects || [],
        }
    }
    componentDidMount() {
        store.subscribe(this.handleProjectsChange.bind(this));
    }
    handleProjectsChange() {
        if(!store.getState().allEvents) return;
        let newProjects = store.getState().allEvents.projects;
        if(!equalArrays(this.state.projects, newProjects)) {
            this.setState({
                projects: [...newProjects]
            });
        }
    }
    render() {
        let arr = [];
        for(let i = 0; i < this.state.projects.length; ++i) {
            arr.push(
            <div className='option'>
                <span className='option-name'>
                    {this.state.projects[i]}
                </span>
                <input type="checkbox" name={this.state.projects[i]} className='option-check' checked={this.props.activeProjects.indexOf(this.state.projects[i]) !== -1} onChange={this.props.setActiveProjects}/>
            </div>);
        }
        return <div className='options-wrapper' style={{display: this.props.display}}>
            {arr}
        </div>;
    }
}

export default EventProjectSelection;