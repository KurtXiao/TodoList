import React from 'react';
import '../styles/SingleLabel.css';
import deleteSign from '../images/close.png';
import store from '../store';
import { setState } from '../actions/allEvents';
import { updateState } from '../utils/server';
import { LABEL_ITEM, PROJECT_ITEM } from "../utils/constants";

class SingleItem extends React.Component {
    constructor(props) {
        super(props);
    }
    async deleteItem() {
        let state = Object.assign({}, store.getState().allEvents);
        if(this.props.type === LABEL_ITEM) state.labels.splice(state.labels.indexOf(this.props.name), 1);
        else if(this.props.type === PROJECT_ITEM) state.projects.splice(state.projects.indexOf(this.props.name), 1);
        await store.dispatch(setState(state));
        updateState();
    }
    render() {
        return <div className='single-label'>
            <img className='single-label-image' src={this.props.itemSign} />
            <span className='single-label-text'>{this.props.name}</span>
            <img className='single-label-delete' onClick={this.deleteItem.bind(this)} src={deleteSign}/>
        </div>
    }
}

export default SingleItem;