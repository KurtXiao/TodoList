import React from "react";

const EventPrioritySelection = (props) => {
    const key = Math.random();
    return <div className='options-wrapper' style={{display: props.display}}>
        <div className='option'><span className='option-name'>p1</span><input value="p1" type="radio" className='option-check' name={key} checked={props.activePriority === 'p1'} onClick={props.setActivePriority}/></div>
        <div className='option'><span className='option-name'>p2</span><input value="p2" type="radio" className='option-check' name={key} checked={props.activePriority === 'p2'} onClick={props.setActivePriority}/></div>
        <div className='option'><span className='option-name'>p3</span><input value="p3" type="radio" className='option-check' name={key} checked={props.activePriority === 'p3'} onClick={props.setActivePriority}/></div>
        <div className='option'><span className='option-name'>p4</span><input value="p4" type="radio" className='option-check' name={key} checked={props.activePriority === 'p4'} onClick={props.setActivePriority}/></div>
    </div>
}

export default EventPrioritySelection;