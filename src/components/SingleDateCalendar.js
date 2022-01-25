import React from 'react';
import { OVERALL_CALENDAR } from '../utils/constants';

class SingleDateCalendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.backgroundColor === 'transparent') {
            return <div onClick={this.props.setActiveDate} className={this.props.type === OVERALL_CALENDAR ? 'grid-cell' : 'grid-cell-event-calendar'}>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor}}>
                {this.props.date}
                </div>
            </div>;
        }
        else {
            return <div onClick={this.props.setActiveDate} className={this.props.type === OVERALL_CALENDAR ? 'grid-cell' : 'grid-cell-event-calendar'}>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor,
                marginLeft: '23%',
                height: '100%',
                width: '55%',
                borderRadius: '50%'}}>
                {this.props.date}
                </div>
            </div>;
        }
    }
}

export default SingleDateCalendar;