import React, { useState, useEffect } from "react";
import EventLabelSelection from './EventLabelSelection';
import EventProjectSelection from './EventProjectSelection';
import EventPrioritySelection from './EventPrioritySelection';
import calendarIcon from '../images/calendar.png';
import labelIcon from '../images/label.png';
import projectIcon from '../images/project.png';
import priorityIcon from '../images/priority.png';
import controlSign from '../images/control.png';
import confirmIcon from '../images/confirm.png';
import filterIcon from '../images/filter.png';
import store from '../store';
import { dateToDateObj, goToPrevMonth, goToNextMonth, goToPrevYear, goToNextYear} from '../utils/calendar';
import { setDisplayConditions, filterDisplayEvents } from '../actions/displayArea';
import Calendar from "./Calendar";
import { SINGLE_DATE_CALENDAR } from "../utils/constants";

const Filter = () => {
    const [calendarDisplay, setCalendarDisplay] = useState('none');
    const [labelsDisplay, setLabelsDisplay] = useState('none');
    const [projectsDisplay, setProjectsDisplay] = useState('none');
    const [priorityDisplay, setPriorityDisplay] = useState('none');
    const [markDate, setMarkDate] = useState(dateToDateObj(new Date()));
    const [activeDate, setActiveDate] = useState(dateToDateObj(new Date()));
    const [interfaceDisplay, setInterfaceDisplay] = useState('none');
    const [activeLabels, setActiveLabels] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [activePriority, setActivePriority] = useState('p4');

    function mySetActiveLabels(e) {
        let activeLabels = [...activeLabels];
        if(e.target.checked) setActiveLabels([...activeLabels, e.target.name]);
        else {
            activeLabels.splice(activeLabels.indexOf(e.target.name), 1);
            setActiveLabels(activeLabels);
        }
    }
    function mySetActiveProjects(e) {
        let activeProjects = [...activeProjects];
        if(e.target.checked) setActiveProjects([...activeProjects, e.target.name])
        else {
            activeProjects.splice(activeProjects.indexOf(e.target.name), 1);
            setActiveProjects(activeProjects);
        }
    }
    function mySetActivePriority(e) {
        setActivePriority(e.target.value);
    }
    function myDisplayCalendar() {
        if(calendarDisplay === 'none') {
            setCalendarDisplay('block');
            setLabelsDisplay('none');
            setProjectsDisplay('none');
            setPriorityDisplay('none');
        }
        else {
            setCalendarDisplay('none');
        }
    }
    function myDisplayLabels() {
        if(labelsDisplay === 'none') {
            setCalendarDisplay('none');
            setLabelsDisplay('block');
            setProjectsDisplay('none');
            setPriorityDisplay('none');
        }
        else {
            setLabelsDisplay('none');
        }
    }
    function myDisplayProjects() {
        if(projectsDisplay === 'none') {
            setCalendarDisplay('none');
            setLabelsDisplay('none');
            setProjectsDisplay('block');
            setPriorityDisplay('none');
        }
        else {
            setProjectsDisplay('none');
        }
    }
    function myDisplayPriority() {
        if(priorityDisplay === 'none') {
            setCalendarDisplay('none');
            setLabelsDisplay('none');
            setProjectsDisplay('none');
            setPriorityDisplay('block');
        }
        else {
            setPriorityDisplay('none');
        }
    }
    function myDisplayInterface() {
        setInterfaceDisplay(interfaceDisplay === 'none' ? 'block' : 'none');
        setCalendarDisplay('none');
        setLabelsDisplay('none');
        setProjectsDisplay('none');
        setPriorityDisplay('none');
        setMarkDate(dateToDateObj(new Date()));
        setActiveDate(dateToDateObj(new Date()));
        setActiveLabels([]);
        setActiveProjects([]);
        setActivePriority('p4');
    }
    async function confirmFilter() {
        let conditions = {
            activeDate: activeDate,
            activeLabels: activeLabels,
            activeProjects: activeProjects,
            activePriority: activePriority,
        };
        await store.dispatch(setDisplayConditions(conditions));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
        setInterfaceDisplay('none');
        setCalendarDisplay('none');
        setLabelsDisplay('none');
        setProjectsDisplay('none');
        setPriorityDisplay('none');
        setMarkDate(dateToDateObj(new Date()));
        setActiveDate(dateToDateObj(new Date()));
        setActiveLabels([]);
        setActiveProjects([]);
        setActivePriority('p4');
    }
    return <div>
            <div className='event-adder-wrapper' onClick={myDisplayInterface}>
                <img className="addition-arrow" src={controlSign}/>
                <span className='event-adder-text'>Filter Event</span>
                <img className='event-adder-img' src={filterIcon}></img>
            </div>
            <div className='single-event-icons test' style={{display: interfaceDisplay}}>
                <img onClick={confirmFilter} src={confirmIcon} className='confirm-icon'/>
                <img onClick={myDisplayPriority} className='single-event-icon' src={priorityIcon}/>
                <img onClick={myDisplayProjects} className='single-event-icon' src={projectIcon}/>
                <img onClick={myDisplayLabels} className='single-event-icon' src={labelIcon}/>
                <img onClick={myDisplayCalendar} className='single-event-icon' src={calendarIcon}/>
                <Calendar
                    type={SINGLE_DATE_CALENDAR} 
                    display={calendarDisplay}
                    goToPrevMonth={goToPrevMonth}
                    goToNextMonth={goToNextMonth}
                    goToPrevYear={goToPrevYear}
                    goToNextYear={goToNextYear}
                    markDate={markDate}
                    activeDate={activeDate}
                    setActiveDate={setActiveDate} />
                <EventLabelSelection display={labelsDisplay} activeLabels={activeLabels} setActiveLabels={mySetActiveLabels}/>
                <EventProjectSelection display={projectsDisplay} activeProjects={activeProjects} setActiveProjects={mySetActiveProjects}/>
                <EventPrioritySelection display={priorityDisplay} activePriority={activePriority} setActivePriority={mySetActivePriority}/>
            </div>
        </div>
}

export default Filter;