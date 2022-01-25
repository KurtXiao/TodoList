import React from 'react';
import '../styles/Calendar.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';
import leftDoubleArrow from '../images/arrow-double-left.png';
import rightDoubleArrow from '../images/arrow-double-right.png';
import { dateToDateObj, getMonthYear, getWeekDays, goToPrevYear, goToNextYear, goToPrevMonth, goToNextMonth, getDates, setActiveDate} from '../utils/calendar';
import { SINGLE_DATE_CALENDAR } from '../utils/constants';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div style={{display: this.props.display}} className={this.props.type === SINGLE_DATE_CALENDAR ? "event-calendar" : "calendar"} key={Math.random()}>
            <div className={this.props.type === SINGLE_DATE_CALENDAR ? "event-calendar-interface" : "calendar-interface"}>
                <img onClick={this.props.goToPrevYear} className="arrow left-double-arrow" src={leftDoubleArrow} />
                <img onClick={this.props.goToNextYear} className="arrow right-double-arrow" src={rightDoubleArrow} />
                <img onClick={this.props.goToPrevMonth} className="arrow left-arrow" src={leftArrow} />
                <img onClick={this.props.goToNextMonth} className="arrow right-arrow" src={rightArrow} />
                <span className={this.props.type === SINGLE_DATE_CALENDAR ? "event-calendar-month" : "month"}>{getMonthYear(this.props.markDate)}</span>
            </div>
            <div className={this.props.type === SINGLE_DATE_CALENDAR ? "event-calendar-dates" : "dates"}>
                {getWeekDays(this.props.type === SINGLE_DATE_CALENDAR ? true : false)}
                {getDates.call(this, this.props.markDate, this.props.activeDate, this.props.type, this.props.setActiveDate)}
            </div>
                </div>;
    }
}

export default Calendar;