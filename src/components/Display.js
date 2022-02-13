import React, { useState, useEffect } from "react";
import '../styles/Display.css';
import store from '../store';
import { equalArrays, getDisplayEvents } from '../utils/redux';

const Display = () => {
    const [events, setEvents] = useState([]);

    async function handleDisplayAreaEventsChange() {
        if(!store.getState().displayArea) return;
        let newEvents = store.getState().displayArea.events;
        if(newEvents && !equalArrays(newEvents, events)) await setEvents(newEvents);
    }

    useEffect(() => {
        let unsubscribe = store.subscribe(handleDisplayAreaEventsChange);
        return () => unsubscribe();
    });

    return <div id="display">
        {getDisplayEvents(events)}
    </div>
}

export default Display;