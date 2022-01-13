import SingleDateCalendar from "../components/SingleDateCalendar";
import SingleDateEventCalendar from "../components/SingleDateEventCalendar";
import SingleDateAddEvent from '../components/SingleDateAddEvent';
import { SINGLE_DATE_CALENDAR, SINGLE_DATE_ADD_EVENT, SINGLE_DATE_EVENT_CALENDAR } from '../utils/constants';

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