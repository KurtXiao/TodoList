import React from "react";
import '../styles/Display.css';
import store from '../store';
import { equalArrays, getDisplayEvents } from '../utils/redux';

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentDidMount() {
        store.subscribe(this.handleDisplayAreaEventsChange.bind(this));
    }
    async handleDisplayAreaEventsChange() {
        if(!store.getState().displayArea) return;
        let newEvents = store.getState().displayArea.events;
        if(newEvents && !equalArrays(newEvents, this.state.events)) {
            await this.setState({
                events: newEvents
            });
        }
    }
    render() {
        return <div id="display">
            {getDisplayEvents(this.state.events)}
        </div>
    }
}

export default Display;