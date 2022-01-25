import React from "react";
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
import { dateToDateObj, goToPrevMonth, goToNextMonth, goToPrevYear, goToNextYear, setActiveDate} from '../utils/calendar';
import { setDisplayConditions, filterDisplayEvents } from '../actions/displayArea';
import Calendar from "./Calendar";
import { SINGLE_DATE_CALENDAR } from "../utils/constants";

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
            interfaceDisplay: 'none',
            activeLabels: [],
            activeProjects: [],
            activePriority: 'p4',
        }
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    setActiveLabels(e) {
        let activeLabels = [...this.state.activeLabels];
        if(e.target.checked) {
            this.setState({
                activeLabels: [...activeLabels, e.target.name]
            })
        }
        else {
            activeLabels.splice(activeLabels.indexOf(e.target.name), 1)
            this.setState({
                activeLabels: activeLabels
            })
        }
    }
    setActiveProjects(e) {
        let activeProjects = [...this.state.activeProjects];
        if(e.target.checked) {
            this.setState({
                activeProjects: [...activeProjects, e.target.name]
            })
        }
        else {
            activeProjects.splice(activeProjects.indexOf(e.target.name), 1)
            this.setState({
                activeProjects: activeProjects
            })
        }
    }
    setActivePriority(e) {
        this.setState({
            activePriority: e.target.value
        })
    }
    displayCalendar() {
        if(this.state.calendarDisplay === 'none') {
            this.setState({
                calendarDisplay: 'block',
                labelsDisplay: 'none',
                projectsDisplay: 'none',
                priorityDisplay: 'none',
            });
        }
        else {
            this.setState({
                calendarDisplay: 'none',
            })
        }
    }
    displayLabels() {
        if(this.state.labelsDisplay === 'none') {
            this.setState({
                calendarDisplay: 'none',
                labelsDisplay: 'block',
                projectsDisplay: 'none',
                priorityDisplay: 'none',
            });
        }
        else {
            this.setState({
                labelsDisplay: 'none',
            })
        }
    }
    displayProjects() {
        if(this.state.projectsDisplay === 'none') {
            this.setState({
                calendarDisplay: 'none',
                labelsDisplay: 'none',
                projectsDisplay: 'block',
                priorityDisplay: 'none',
            });
        }
        else {
            this.setState({
                projectsDisplay: 'none',
            })
        }
    }
    displayPriority() {
        if(this.state.priorityDisplay === 'none') {
            this.setState({
                calendarDisplay: 'none',
                labelsDisplay: 'none',
                projectsDisplay: 'none',
                priorityDisplay: 'block',
            });
        }
        else {
            this.setState({
                priorityDisplay: 'none',
            })
        }
    }
    async displayInterface() {
        await this.setState({
            interfaceDisplay: this.state.interfaceDisplay === 'none' ? 'block' : 'none',
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
            activeLabels: [],
            activeProjects: [],
            activePriority: 'p4',
        });
    }
    async confirmFilter() {
        let conditions = {
            activeDate: this.state.activeDate,
            activeLabels: this.state.activeLabels,
            activeProjects: this.state.activeProjects,
            activePriority: this.state.activePriority,
        };
        await store.dispatch(setDisplayConditions(conditions));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
        await this.setState({
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
            interfaceDisplay: 'none',
            activeLabels: [],
            activeProjects: [],
            activePriority: 'p4',
        });
    }
    render() {
        return <div>
                <div className='event-adder-wrapper' onClick={this.displayInterface.bind(this)}>
                    <img className="addition-arrow" src={controlSign}/>
                    <span className='event-adder-text'>Filter Event</span>
                    <img className='event-adder-img' src={filterIcon}></img>
                </div>
                <div className='single-event-icons test' style={{display: this.state.interfaceDisplay}}>
                    <img onClick={this.displayCalendar.bind(this)} className='single-event-icon' src={calendarIcon}/>
                    <img onClick={this.displayLabels.bind(this)} className='single-event-icon' src={labelIcon}/>
                    <img onClick={this.displayProjects.bind(this)} className='single-event-icon' src={projectIcon}/>
                    <img onClick={this.displayPriority.bind(this)} className='single-event-icon' src={priorityIcon}/>
                    <img onClick={this.confirmFilter.bind(this)} src={confirmIcon} className='confirm-icon'/>
                    <Calendar
                        type={SINGLE_DATE_CALENDAR} 
                        display={this.state.calendarDisplay}
                        goToPrevMonth={goToPrevMonth.bind(this)}
                        goToNextMonth={goToNextMonth.bind(this)}
                        goToPrevYear={goToPrevYear.bind(this)}
                        goToNextYear={goToNextYear.bind(this)}
                        markDate={this.state.markDate}
                        activeDate={this.state.activeDate}
                        setActiveDate={setActiveDate.bind(this)} />
                    <EventLabelSelection display={this.state.labelsDisplay} activeLabels={this.state.activeLabels} setActiveLabels={this.setActiveLabels.bind(this)}/>
                    <EventProjectSelection display={this.state.projectsDisplay} activeProjects={this.state.activeProjects} setActiveProjects={this.setActiveProjects.bind(this)}/>
                    <EventPrioritySelection display={this.state.priorityDisplay} activePriority={this.state.activePriority} setActivePriority={this.setActivePriority.bind(this)}/>
                </div>
            </div>
    }
}

export default Filter;