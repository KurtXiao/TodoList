import React from "react";
import "../styles/EventLabelSelection.css";
import store from "../store";
import { equalArrays } from "../utils/redux";

class EventLabelSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: store.getState().allEvents?.labels || [],
        }
    }
    componentDidMount() {
        store.subscribe(this.handleLabelsChange.bind(this));
    }
    handleLabelsChange() {
        if(!store.getState().allEvents) return;
        let newLabels = store.getState().allEvents.labels;
        if(!equalArrays(this.state.labels, newLabels)) {
            this.setState({
                labels: [...newLabels]
            });
        }
    }
    render() {
        let arr = [];
        for(let i = 0; i < this.state.labels.length; ++i) {
            arr.push(
            <div className='option'>
                <span className='option-name'>
                    {this.state.labels[i]}
                </span>
                <input type="checkbox" name={this.state.labels[i]} className='option-check' checked={this.props.activeLabels.indexOf(this.state.labels[i]) !== -1} onChange={this.props.setActiveLabels}/>
            </div>);
        }
        return <div className='options-wrapper' style={{display: this.props.display}}>
            {arr}
        </div>;
    }
}

export default EventLabelSelection;