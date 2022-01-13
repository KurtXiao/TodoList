import React from 'react';
import '../styles/Project.css';
import store from '../store';
import { equalArrays, getDisplayEvents } from '../utils/redux';


class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    async componentDidMount() {
        store.subscribe(this.handleProjectAreaEventsChange.bind(this));
    }
    async handleProjectAreaEventsChange() {
        if(!store.getState().projectArea) return;
        let newEvents = store.getState().projectArea.events;
        if(newEvents && !equalArrays(newEvents, this.state.events)) {
            await this.setState({
                events: newEvents
            });
        }
    }
    render() {
        return <div id="project">
            {getDisplayEvents(this.state.events)}
        </div>
    }
}

export default Project;