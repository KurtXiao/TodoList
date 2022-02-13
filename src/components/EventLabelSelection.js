import React, { useState, useEffect } from "react";
import "../styles/EventLabelSelection.css";
import store from "../store";
import { equalArrays } from "../utils/redux";

const EventLabelSelection = (props) => {
    const [state, setState] = useState({
        labels: store.getState().allEvents?.labels || []
    });
    function handleLabelsChange() {
        if(!store.getState().allEvents) return;
        let newLabels = store.getState().allEvents.labels;
        if(!equalArrays(state.labels, newLabels)) {
            setState({
                labels: [...newLabels]
            });
        }
    }
    useEffect(() => {
        let unsubscribe = store.subscribe(handleLabelsChange);
        return (() => {
            unsubscribe();
        });
    })
    let arr = [];
    for(let i = 0; i < state.labels.length; ++i) {
        arr.push(
        <div className='option'>
            <span className='option-name'>
                {state.labels[i]}
            </span>
            <input type="checkbox" name={state.labels[i]} className='option-check' checked={props.activeLabels.indexOf(state.labels[i]) !== -1} onChange={props.setActiveLabels}/>
        </div>);
    }
    return <div className='options-wrapper' style={{display: props.display}}>
        {arr}
    </div>;
}

export default EventLabelSelection;