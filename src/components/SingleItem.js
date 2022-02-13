import React from 'react';
import '../styles/SingleLabel.css';
import deleteSign from '../images/close.png';
import store from '../store';
import { setState } from '../actions/allEvents';
import { updateState } from '../utils/server';
import { LABEL_ITEM, PROJECT_ITEM } from "../utils/constants";

const SingleItem = (props) => {
    async function deleteItem() {
        let state = Object.assign({}, store.getState().allEvents);
        if(props.type === LABEL_ITEM) state.labels.splice(state.labels.indexOf(props.name), 1);
        else if(props.type === PROJECT_ITEM) state.projects.splice(state.projects.indexOf(props.name), 1);
        await store.dispatch(setState(state));
        updateState();
    }
    return <div className='single-label'>
        <img className='single-label-image' src={props.itemSign} />
        <span className='single-label-text'>{props.name}</span>
        <img className='single-label-delete' onClick={() => deleteItem()} src={deleteSign}/>
    </div>;
}

export default SingleItem;