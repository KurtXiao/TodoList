import React from 'react';
import '../styles/Calendar.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';
import leftDoubleArrow from '../images/arrow-double-left.png';
import rightDoubleArrow from '../images/arrow-double-right.png';
import { getMonthYear, getWeekDays, getDates} from '../utils/calendar';
import { SINGLE_DATE_CALENDAR } from '../utils/constants';

const Calendar = (props) => {
    return <div style={{display: props.display}} className={props.type === SINGLE_DATE_CALENDAR ? "event-calendar" : "calendar"} key={Math.random()}>
        <div className={props.type === SINGLE_DATE_CALENDAR ? "event-calendar-interface" : "calendar-interface"}>
            <img onClick={props.goToPrevYear} className="arrow left-double-arrow" src={leftDoubleArrow} />
            <img onClick={props.goToNextYear} className="arrow right-double-arrow" src={rightDoubleArrow} />
            <img onClick={props.goToPrevMonth} className="arrow left-arrow" src={leftArrow} />
            <img onClick={props.goToNextMonth} className="arrow right-arrow" src={rightArrow} />
            <span className={props.type === SINGLE_DATE_CALENDAR ? "event-calendar-month" : "month"}>{getMonthYear(props.markDate)}</span>
        </div>
        <div className={props.type === SINGLE_DATE_CALENDAR ? "event-calendar-dates" : "dates"}>
            {getWeekDays(props.type === SINGLE_DATE_CALENDAR ? true : false)}
            {getDates(props.markDate, props.activeDate, props.type, props.setActiveDate)}
        </div>
            </div>;
}

export default Calendar;