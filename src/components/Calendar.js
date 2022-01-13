import React from 'react';
import '../styles/Calendar.css';
import leftArrow from '../images/arrow-left.png';
import rightArrow from '../images/arrow-right.png';
import leftDoubleArrow from '../images/arrow-double-left.png';
import rightDoubleArrow from '../images/arrow-double-right.png';
import { dateToDateObj, getMonthYear, getWeekDays, getPreviousMonthDateObj, getNextMonthDateObj, getPreviousYearDateObj, getNextYearDateObj, getLastMonthTotalDates, getCurrMonthTotalDates, getCurrMonthStartingDay, getNextMonthStartingDay} from '../utils/calendar';
import SingleDateCalendar from './SingleDateCalendar';
import { setDisplayConditions, filterDisplayEvents } from '../actions/displayArea';
import store from '../store';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date())
        }
    }
    goToPrevYear() {
        this.setState({
            markDate: getPreviousYearDateObj(this.state.markDate)
        })
    }
    goToNextYear() {
        this.setState({
            markDate: getNextYearDateObj(this.state.markDate)
        })
    }
    goToPrevMonth() {
        this.setState({
            markDate: getPreviousMonthDateObj(this.state.markDate)
        })
    }
    goToNextMonth() {
        this.setState({
            markDate: getNextMonthDateObj(this.state.markDate)
        })
    }
    async setActiveDate(date) {
        let dateObj = this.state.markDate;
        dateObj[2] = date;
        await this.setState({
            markDate: dateObj,
            activeDate: dateObj,
        });
        await store.dispatch(setDisplayConditions({activeDate: dateObj}));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
    }
    getDates(markDate, activeDate) {
        let arr = [];
        let lastMonthTotalDates = getLastMonthTotalDates(markDate);
        let currMonthTotalDates = getCurrMonthTotalDates(markDate);
        let currMonthStartingDay = getCurrMonthStartingDay(markDate);
        let nextMonthStartingDay = getNextMonthStartingDay(markDate);
        for(let i = lastMonthTotalDates - currMonthStartingDay + 1; i <= lastMonthTotalDates; ++i) {
            arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={()=>{}}/>)
        }
        for(let i = 1; i <= currMonthTotalDates; ++i) {
            if(getMonthYear(markDate) === getMonthYear(activeDate) && i === activeDate[2]) arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'#dc4c3e'} fontColor={'white'} setActiveDate={this.setActiveDate.bind(this)}/>)
            else arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'black'} setActiveDate={this.setActiveDate.bind(this)}/>)
            
        }
        for(let i = 1; i <= 7 - nextMonthStartingDay; ++i) {
            arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={()=>{}}/>);
        }
        return arr;
    }
    render() {
        return <div id="calendar">
            <div id="calendar-interface">
                <img onClick={this.goToPrevYear.bind(this)} className="arrow left-double-arrow" src={leftDoubleArrow} />
                <img onClick={this.goToNextYear.bind(this)} className="arrow right-double-arrow" src={rightDoubleArrow} />
                <img onClick={this.goToPrevMonth.bind(this)} className="arrow left-arrow" src={leftArrow} />
                <img onClick={this.goToNextMonth.bind(this)} className="arrow right-arrow" src={rightArrow} />
                <span id="month">{getMonthYear(this.state.markDate)}</span>
            </div>
            <div id="dates">
                {getWeekDays(false)}
                {this.getDates(this.state.markDate, this.state.activeDate)}
            </div>
                </div>;
    }
}

export default Calendar;