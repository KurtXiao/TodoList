import React from 'react';
import '../styles/EventCalendar.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';
import leftDoubleArrow from '../images/arrow-double-left.png';
import rightDoubleArrow from '../images/arrow-double-right.png';
import { getMonthYear, getWeekDays } from '../utils/calendar';


class AddEventCalendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className='event-calendar' style={{display: this.props.display}}>
        <div className="event-calendar-interface">
            <img onClick={this.props.goToPrevYear} className="arrow left-double-arrow" src={leftDoubleArrow} />
            <img onClick={this.props.goToNextYear} className="arrow right-double-arrow" src={rightDoubleArrow} />
            <img onClick={this.props.goToPrevMonth} className="arrow left-arrow" src={leftArrow} />
            <img onClick={this.props.goToNextMonth} className="arrow right-arrow" src={rightArrow} />
            <span className="event-calendar-month">{getMonthYear(this.props.markDate)}</span>
        </div>
        <div className="event-calendar-dates">
            {getWeekDays(true)}
            {this.props.getDates(this.props.markDate, this.props.activeDate)}
        </div>
            </div>;
    }
}

export default AddEventCalendar;