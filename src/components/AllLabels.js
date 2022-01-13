import React from "react";
import '../styles/AllLabels.css';
import controlSign from '../images/control.png';
import addition from '../images/addition.png';
import labelSign from '../images/label.png';
import confirmSign from '../images/confirmOrange.png';
import SingleLabel from "./SingleLabel";
import store from "../store";
import { equalArrays } from "../utils/redux";
import { setState } from "../actions/allEvents";
import { updateState } from '../utils/server';


class AllLabels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAddLabel: 'none',
            displayLabels: 'none',
            labels: [],
            name: '',
        }
    }
    async componentDidMount() {
        await store.subscribe(this.handleLabelsChange.bind(this));
    }
    handleLabelsChange() {
        let newLabels = store.getState().allEvents?.labels;
        if(newLabels && !equalArrays(newLabels, this.state.labels)) {
            this.setState({
                labels: [...newLabels]
            })
        }
    }
    displayAddLabel() {
        this.setState({
            displayAddLabel: this.state.displayAddLabel === 'none' ? 'block' : 'none'
        });
    }
    displayLabels() {
        let displayVal = this.state.displayLabels === 'none' ? 'block' : 'none';
        if(this.state.labels.length === 0) displayVal = 'none';
        this.setState({
            displayLabels: displayVal
        })
    }
    getLabels(labels) {
        let arr = [];
        for(let i = 0; i < labels.length; ++i) {
            arr.push(<SingleLabel key={Math.random()} name={labels[i]}/>);
        }
        return arr;
    }
    handleInputValue(e) {
        this.setState({
            name: e.target.value
        });
    }
    async addLabel() {
        if(this.state.name === '') {
            alert('Label name must not be empty!');
            return;
        }
        if(store.getState().allEvents.labels.indexOf(this.state.name) !== -1) {
            alert('Repeated label!');
            return;
        }
        let state = Object.assign({}, store.getState().allEvents);
        state.labels.push(this.state.name);
        await store.dispatch(setState(state));
        this.setState({
            displayAddLabel: 'none',
            name: ''
        });
        updateState();
    }
    render() {
        return <div className="label-controller">
            <div className="addition">
                <img className="addition-arrow" src={controlSign} onClick={this.displayLabels.bind(this)}/>
                <span className="addition-text" onClick={this.displayLabels.bind(this)}>Labels</span>
                <img className="addition-sign" src={addition} onClick={this.displayAddLabel.bind(this)}/>
            </div>
            <div className="single-label-wrapper" style={{display: this.state.displayLabels}}>
                {this.getLabels(this.state.labels)}
            </div>
            <div className='add-label' style={{display: this.state.displayAddLabel}}>
                <img className='add-label-image' src={labelSign}/>
                <input value={this.state.name} className='add-label-name' onChange={this.handleInputValue.bind(this)}/>
                <img className="add-label-confirm" onClick={this.addLabel.bind(this)} src={confirmSign}/>
            </div>
        </div>;
    }
}

export default AllLabels;