import React from 'react';
import { OVERALL_CALENDAR } from '../utils/constants';

const SingleDateCalendar = (props) => {
    if(props.backgroundColor === 'transparent') {
        return <div onClick={props.setActiveDate} className={props.type === OVERALL_CALENDAR ? 'grid-cell' : 'grid-cell-event-calendar'}>
            <div style={{
            color: props.fontColor,
            backgroundColor: props.backgroundColor}}>
            {props.date}
            </div>
        </div>;
    }
    else {
        return <div onClick={props.setActiveDate} className={props.type === OVERALL_CALENDAR ? 'grid-cell' : 'grid-cell-event-calendar'}>
            <div style={{
            color: props.fontColor,
            backgroundColor: props.backgroundColor,
            marginLeft: '23%',
            height: '100%',
            width: '55%',
            borderRadius: '50%'}}>
            {props.date}
            </div>
        </div>;
    }
}

export default SingleDateCalendar;