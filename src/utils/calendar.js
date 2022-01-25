import SingleDateCalendar from "../components/SingleDateCalendar";
import { OVERALL_CALENDAR } from '../utils/constants';
import store from "../store";
import { setDisplayConditions, filterDisplayEvents } from "../actions/displayArea";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function monthIndexToMonth(monthIndex) {
    return months[monthIndex];
}

export function monthToMonthIndex(month) {
    return months.indexOf(month);
}

export function dateToDateObj(date) {
    if(!date) date = new Date();
    return [date.getMonth(), date.getFullYear(), date.getDate()];
}

export function dateObjToDate(dateObj) {
    if(!dateObj) return new Date();
    return new Date(dateObj[1], dateObj[0], dateObj[2]);
}

export function getPreviousMonthDateObj(dateObj) {
    let newDateObj = [...dateObj];
    if(newDateObj[0] === 0) {
        newDateObj[0] = 11;
        newDateObj[1] -= 1;
        newDateObj[2] = 1;
    }
    else {
        newDateObj[0] -= 1;
        newDateObj[2] = 1;
    }
    return newDateObj;
}

export function getNextMonthDateObj(dateObj) {
    let newDateObj = [...dateObj];
    if(newDateObj[0] === 11) {
        newDateObj[0] = 0;
        newDateObj[1] += 1;
        newDateObj[2] = 1;
    }
    else {
        newDateObj[0] += 1;
        newDateObj[2] = 1;
    }
    return newDateObj;
}

export function getPreviousYearDateObj(dateObj) {
    let newDateObj = [...dateObj];
    newDateObj[1] -= 1;
    newDateObj[2] = 1;
    return newDateObj;
}

export function getNextYearDateObj(dateObj) {
    let newDateObj = [...dateObj];
    newDateObj[1] += 1;
    newDateObj[2] = 1;
    return newDateObj;
}

export function getMonthYear(dateObj) {
    return monthIndexToMonth(dateObj[0]) + ' ' + dateObj[1].toString();
}

export function getWeekDays(event) {
    if(event) {
        return [
            <span className={'grid-cell-event-calendar'}>S</span>,
            <span className={'grid-cell-event-calendar'}>M</span>,
            <span className={'grid-cell-event-calendar'}>T</span>,
            <span className={'grid-cell-event-calendar'}>W</span>,
            <span className={'grid-cell-event-calendar'}>T</span>,
            <span className={'grid-cell-event-calendar'}>F</span>,
            <span className={'grid-cell-event-calendar'}>S</span>,
        ]
    }
    return [
        <span className={'grid-cell'}>SUN</span>,
        <span className={'grid-cell'}>MON</span>,
        <span className={'grid-cell'}>TUE</span>,
        <span className={'grid-cell'}>WED</span>,
        <span className={'grid-cell'}>THU</span>,
        <span className={'grid-cell'}>FRI</span>,
        <span className={'grid-cell'}>SAT</span>,
    ];
}

export function getLastMonthTotalDates(dateObj) {
    let date = dateObjToDate(dateObj);
    date.setDate(0);
    return date.getDate();
}

export function getCurrMonthTotalDates(dateObj) {
    let date = dateObjToDate(dateObj);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    return date.getDate();
}

export function getCurrMonthStartingDay(dateObj) {
    let date = dateObjToDate(dateObj);
    date.setDate(1);
    return date.getDay();
}

export function getNextMonthStartingDay(dateObj) {
    let nextMonthDateObj = getNextMonthDateObj(dateObj);
    return getCurrMonthStartingDay(nextMonthDateObj);
}

export function goToPrevYear() {
    this.setState({
        markDate: getPreviousYearDateObj(this.state.markDate)
    })
}

export function goToNextYear() {
    this.setState({
        markDate: getNextYearDateObj(this.state.markDate)
    })
}

export function goToPrevMonth() {
    this.setState({
        markDate: getPreviousMonthDateObj(this.state.markDate)
    })
}
export function goToNextMonth() {
    this.setState({
        markDate: getNextMonthDateObj(this.state.markDate)
    })
}

export async function setActiveDate(date, type) {
    console.log(this);
    let dateObj = this.state.markDate;
    dateObj[2] = date;
    await this.setState({
        markDate: dateObj,
        activeDate: dateObj,
    });
    if(type === OVERALL_CALENDAR) {
        await store.dispatch(setDisplayConditions({activeDate: dateObj}));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
    }
}

export function getDates(markDate, activeDate, type, setActiveDate) {
    let arr = [];
    let lastMonthTotalDates = getLastMonthTotalDates(markDate);
    let currMonthTotalDates = getCurrMonthTotalDates(markDate);
    let currMonthStartingDay = getCurrMonthStartingDay(markDate);
    let nextMonthStartingDay = getNextMonthStartingDay(markDate);
    for(let i = lastMonthTotalDates - currMonthStartingDay + 1; i <= lastMonthTotalDates; ++i) {
        arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} type={type} setActiveDate={()=>{}}/>)
    }
    for(let i = 1; i <= currMonthTotalDates; ++i) {
        if(getMonthYear(markDate) === getMonthYear(activeDate) && i === activeDate[2]) arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'#dc4c3e'} fontColor={'white'} type={type} setActiveDate={setActiveDate?.bind(this, i, type)}/>)
        else arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'black'} type={type} setActiveDate={setActiveDate?.bind(this, i, type)}/>)
        
    }
    for(let i = 1; i <= 7 - nextMonthStartingDay; ++i) {
        arr.push(<SingleDateCalendar key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} type={type} setActiveDate={()=>{}}/>);
    }
    return arr;
}