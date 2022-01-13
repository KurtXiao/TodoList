import React from 'react';
import '../styles/SingleLabel.css';
import labelSign from '../images/label.png';
import deleteSign from '../images/close.png';
import store from '../store';
import { setState } from '../actions/allEvents';
import { updateState } from '../utils/server';

class SingleLabel extends React.Component {
    constructor(props) {
        super(props);
    }
    async deleteLabel() {
        let state = Object.assign({}, store.getState().allEvents);
        state.labels.splice(state.labels.indexOf(this.props.name), 1);
        await store.dispatch(setState(state));
        updateState();
    }
    render() {
        return <div className='single-label'>
            <img className='single-label-image' src={labelSign} />
            <span className='single-label-text'>{this.props.name}</span>
            <img className='single-label-delete' onClick={this.deleteLabel.bind(this)} src={deleteSign}/>
        </div>
    }
}

export default SingleLabel;