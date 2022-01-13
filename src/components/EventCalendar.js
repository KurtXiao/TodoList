import React from 'react';
import '../styles/EventCalendar.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';
import leftDoubleArrow from '../images/arrow-double-left.png';
import rightDoubleArrow from '../images/arrow-double-right.png';
import { getMonthYear, getWeekDays, getLastMonthTotalDates, getCurrMonthTotalDates, getCurrMonthStartingDay, getNextMonthStartingDay} from '../utils/calendar';
import SingleDateEventCalendar from './SingleDateEventCalendar';

class EventCalendar extends React.Component {
    constructor(props) {
        super(props);
    }
    getDates(markDate, activeDate) {
        let arr = [];
        let lastMonthTotalDates = getLastMonthTotalDates(markDate);
        let currMonthTotalDates = getCurrMonthTotalDates(markDate);
        let currMonthStartingDay = getCurrMonthStartingDay(markDate);
        let nextMonthStartingDay = getNextMonthStartingDay(markDate);
        for(let i = lastMonthTotalDates - currMonthStartingDay + 1; i <= lastMonthTotalDates; ++i) {
            arr.push(<SingleDateEventCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={()=>{}}/>)
        }
        for(let i = 1; i <= currMonthTotalDates; ++i) {
            if(getMonthYear(markDate) === getMonthYear(activeDate) && i === activeDate[2]) arr.push(<SingleDateEventCalendar key={Math.random()} date={i} backgroundColor={'#dc4c3e'} fontColor={'white'} setActiveDate={this.props.setActiveDate}/>)
            else arr.push(<SingleDateEventCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'black'} setActiveDate={this.props.setActiveDate}/>)
        }
        for(let i = 1; i <= 7 - nextMonthStartingDay; ++i) {
            arr.push(<SingleDateEventCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={()=>{}}/>);
        }
        return arr;
    }
    render() {
        return <div className='event-calendar' style={{display: this.props.display}} key={Math.random()}>
        <div className="event-calendar-interface">
            <img onClick={this.props.goToPrevYear} className="arrow left-double-arrow" src={leftDoubleArrow} />
            <img onClick={this.props.goToNextYear} className="arrow right-double-arrow" src={rightDoubleArrow} />
            <img onClick={this.props.goToPrevMonth} className="arrow left-arrow" src={leftArrow} />
            <img onClick={this.props.goToNextMonth} className="arrow right-arrow" src={rightArrow} />
            <span className="event-calendar-month">{getMonthYear(this.props.markDate)}</span>
        </div>
        <div className="event-calendar-dates">
            {getWeekDays(true)}
            {this.getDates(this.props.markDate, this.props.activeDate)}
        </div>
            </div>;
    }
}

export default EventCalendar;