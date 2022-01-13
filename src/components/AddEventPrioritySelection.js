import React from "react";

class AddEventPrioritySelection extends React.Component {
    constructor(props) {
        super(props);
        this.key = Math.random();
    }
    render() {
        return <div className='options-wrapper' style={{display: this.props.display}}>
            <div className='option'><label for='p1' className='option-name'>p1</label><input type="radio" value='p1' className='option-check' name={this.key} checked={this.props.activePriority === 'p1'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><label for='p2' className='option-name'>p2</label><input type="radio" value='p2' className='option-check' name={this.key} checked={this.props.activePriority === 'p2'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><label for='p3' className='option-name'>p3</label><input type="radio" value='p3' className='option-check' name={this.key} checked={this.props.activePriority === 'p3'} onClick={this.props.setActivePriority}/></div>
            <div className='option'><label for='p4' className='option-name'>p4</label><input type="radio" value='p4' className='option-check' name={this.key} checked={this.props.activePriority === 'p4'} onClick={this.props.setActivePriority}/></div>
        </div>
    }
}

export default AddEventPrioritySelection;