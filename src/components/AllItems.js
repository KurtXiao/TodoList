import React, { useState, useEffect } from "react";
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

const AllItems = (props) => {
    const [displayAddItem, setDisplayAddItem] = useState('none');
    const [displayItems, setDisplayItems] = useState('none');
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    useEffect(async () => {
        let unsubscribe = await store.subscribe(handleItemsChange);
        return () => unsubscribe();
    })
    function handleItemsChange() {
        let newItems;
        if(props.type === LABEL_ITEM) newItems = store.getState().allEvents?.labels;
        else if(props.type === PROJECT_ITEM) newItems = store.getState().allEvents?.projects;
        if(newItems && !equalArrays(newItems, items)) setItems([...newItems]);
    }
    function mySetDisplayItems() {
        let displayVal = displayItems === 'none' ? 'block' : 'none';
        if(items.length === 0) displayVal = 'none';
        setDisplayItems(displayVal);
    }
    function getItems(items) {
        let arr = [];
        for(let i = 0; i < items.length; ++i) {
            arr.push(<SingleItem key={Math.random()} name={items[i]} type={props.type} itemSign={props.itemSign}/>);
        }
        return arr;
    }
    function handleInputValue(e) {
        setName(e.target.value);
    }
    async function addItem() {
        if(name === '') {
            alert(`${props.type === LABEL_ITEM ? "Label" : "Project"} name must not be empty!`);
            return;
        }
        if(props.type === LABEL_ITEM) {
            if(store.getState().allEvents.labels.indexOf(name) !== -1) {
                alert(`Repeated label!`);
                return;
            }
        }
        else if(props.type === PROJECT_ITEM) {
            if(store.getState().allEvents.projects.indexOf(name) !== -1) {
                alert(`Repeated project!`);
                return;
            }
        }
        let state = Object.assign({}, store.getState().allEvents);
        if(props.type === LABEL_ITEM) state.labels.push(name);
        else if(props.type === PROJECT_ITEM) state.projects.push(name);
        await store.dispatch(setState(state));
        setDisplayAddItem('none');
        setName('');
        updateState();
    }
    return <div className="label-controller">
        <div className="addition">
            <img className="addition-arrow" src={controlSign} onClick={mySetDisplayItems}/>
            <span className="addition-text" onClick={mySetDisplayItems}>{props.type === LABEL_ITEM ? "Labels" : "Projects"}</span>
            <img className="addition-sign" src={addition} onClick={() => setDisplayAddItem(displayAddItem === 'none' ? 'block' : 'none')}/>
        </div>
        <div className="single-label-wrapper" style={{display: displayItems}}>
            {getItems(items)}
        </div>
        <div className='add-label' style={{display: displayAddItem}}>
            <img className='add-label-image' src={props.itemSign}/>
            <input value={name} className='add-label-name' onChange={handleInputValue}/>
            <img className="add-label-confirm" onClick={() => addItem()} src={confirmSign}/>
        </div>
    </div>;
}

export default AllItems;