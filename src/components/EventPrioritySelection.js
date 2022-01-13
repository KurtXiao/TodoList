import React from "react";

class EventPrioritySelection extends React.Component {
    constructor(props) {
        super(props);
        this.key = Math.random();
    }
    render() {
        return <div className='options-wrapper' style={{display: this.props.display}}>
            <div className='option'><span className='option-name'>p1</span><input value="p1" type="radio" className='option-check' name={this.key} checked={this.props.activePriority === 'p1'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><span className='option-name'>p2</span><input value="p2" type="radio" className='option-check' name={this.key} checked={this.props.activePriority === 'p2'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><span className='option-name'>p3</span><input value="p3" type="radio" className='option-check' name={this.key} checked={this.props.activePriority === 'p3'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><span className='option-name'>p4</span><input value="p4" type="radio" className='option-check' name={this.key} checked={this.props.activePriority === 'p4'} onClick={this.props.setActivePriority}/></div>
        </div>
    }
}

export default EventPrioritySelection;