import React from "react";
import '../styles/AllItems.css';
import controlSign from '../images/control.png';
import addition from '../images/addition.png';
import confirmSign from '../images/confirmOrange.png';
import SingleItem from "./SingleItem";
import store from "../store";
import { equalArrays } from "../utils/redux";
import { setState } from "../actions/allEvents";
import { updateState } from '../utils/server';
import { LABEL_ITEM, PROJECT_ITEM } from "../utils/constants";

class AllItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAddItem: 'none',
            displayItems: 'none',
            items: [],
            name: '',
        }
    }
    async componentDidMount() {
        await store.subscribe(this.handleItemsChange.bind(this));
    }
    handleItemsChange() {
        let newItems;
        if(this.props.type === LABEL_ITEM) newItems = store.getState().allEvents?.labels;
        else if(this.props.type === PROJECT_ITEM) newItems = store.getState().allEvents?.projects;
        if(newItems && !equalArrays(newItems, this.state.items)) {
            this.setState({
                items: [...newItems]
            })
        }
    }
    displayAddItem() {
        this.setState({
            displayAddItem: this.state.displayAddItem === 'none' ? 'block' : 'none'
        });
    }
    displayItems() {
        let displayVal = this.state.displayItems === 'none' ? 'block' : 'none';
        if(this.state.items.length === 0) displayVal = 'none';
        this.setState({
            displayItems: displayVal
        })
    }
    getItems(items) {
        let arr = [];
        for(let i = 0; i < items.length; ++i) {
            arr.push(<SingleItem key={Math.random()} name={items[i]} type={this.props.type} itemSign={this.props.itemSign}/>);
        }
        return arr;
    }
    handleInputValue(e) {
        this.setState({
            name: e.target.value
        });
    }
    async addItem() {
        if(this.state.name === '') {
            alert(`${this.props.type === LABEL_ITEM ? "Label" : "Project"} name must not be empty!`);
            return;
        }
        if(this.props.type === LABEL_ITEM) {
            if(store.getState().allEvents.labels.indexOf(this.state.name) !== -1) {
                alert(`Repeated label!`);
                return;
            }
        }
        else if(this.props.type === PROJECT_ITEM) {
            if(store.getState().allEvents.projects.indexOf(this.state.name) !== -1) {
                alert(`Repeated project!`);
                return;
            }
        }
        let state = Object.assign({}, store.getState().allEvents);
        if(this.props.type === LABEL_ITEM) state.labels.push(this.state.name);
        else if(this.props.type === PROJECT_ITEM) state.projects.push(this.state.name);
        await store.dispatch(setState(state));
        this.setState({
            displayAddItem: 'none',
            name: ''
        });
        updateState();
    }
    render() {
        return <div className="label-controller">
            <div className="addition">
                <img className="addition-arrow" src={controlSign} onClick={this.displayItems.bind(this)}/>
                <span className="addition-text" onClick={this.displayItems.bind(this)}>{this.props.type === LABEL_ITEM ? "Labels" : "Projects"}</span>
                <img className="addition-sign" src={addition} onClick={this.displayAddItem.bind(this)}/>
            </div>
            <div className="single-label-wrapper" style={{display: this.state.displayItems}}>
                {this.getItems(this.state.items)}
            </div>
            <div className='add-label' style={{display: this.state.displayAddItem}}>
                <img className='add-label-image' src={this.props.itemSign}/>
                <input value={this.state.name} className='add-label-name' onChange={this.handleInputValue.bind(this)}/>
                <img className="add-label-confirm" onClick={this.addItem.bind(this)} src={confirmSign}/>
            </div>
        </div>;
    }
}

export default AllItems;