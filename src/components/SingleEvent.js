import React from 'react';
import '../styles/SingleEvent.css';
import check from '../images/check.png';
import calendarIcon from '../images/calendar.png';
import labelIcon from '../images/label.png';
import projectIcon from '../images/project.png';
import priorityIcon from '../images/priority.png';
import confirmIcon from '../images/confirm.png';
import Calendar from './Calendar';
import EventLabelSelection from './EventLabelSelection';
import EventProjectSelection from './EventProjectSelection';
import EventPrioritySelection from './EventPrioritySelection';
import store from '../store';
import { getPreviousMonthDateObj, getNextMonthDateObj, getPreviousYearDateObj, getNextYearDateObj, goToPrevMonth, goToNextMonth, goToPrevYear, goToNextYear, setActiveDate} from '../utils/calendar';
import { updateEvent, setState } from '../actions/allEvents';
import { filterDisplayEvents } from '../actions/displayArea';
import { filterProject } from '../actions/projectArea';
import { updateState } from '../utils/server';
import { SINGLE_DATE_CALENDAR } from '../utils/constants';

class SingleEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            text: this.props.text,
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            interfaceDisplay: 'none',
            markDate: this.props.activeDate,
            activeDate: this.props.activeDate,
            activeLabels: this.props.activeLabels,
            activeProjects: this.props.activeProjects,
            activePriority: this.props.activePriority,
        }
        this.initialText = this.state.text;
        this.initialMarkDate = [...this.state.markDate];
        this.initialActiveDate = [...this.state.activeDate];
        this.initialActiveLabels = [...this.state.activeLabels];
        this.initialActiveProjects = [...this.state.activeProjects];
        this.initialActivePriority = this.state.activePriority;
    }
    displayInterface() {
        this.setState({
            interfaceDisplay: this.state.interfaceDisplay === 'none' ? 'block' : 'none',
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            text: this.initialText,
            markDate: this.initialMarkDate,
            activeDate: this.initialActiveDate,
            activeLabels: this.initialActiveLabels,
            activeProjects: this.initialActiveProjects,
            activePriority: this.initialActivePriority,
        });
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
    async confirmChange() {
        let event = {
            title: this.state.title,
            text: this.state.text,
            activeDate: this.state.activeDate,
            activeLabels: this.state.activeLabels,
            activeProjects: this.state.activeProjects,
            activePriority: this.state.activePriority,
        }
        await store.dispatch(updateEvent(event, this.props.eventIndex));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
        await store.dispatch(filterProject(store.getState().allEvents.events));
        await updateState();
    }
    async completeEvent() {
        let newState = JSON.parse(JSON.stringify(store.getState().allEvents));
        newState.events.splice(this.props.eventIndex, 1);
        await store.dispatch(setState(newState));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
        await store.dispatch(filterProject(store.getState().allEvents.events));
        await updateState();
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
    setActiveDate(date) {
        let dateObj = this.state.markDate;
        dateObj[2] = date;
        this.setState({
            markDate: dateObj,
            activeDate: dateObj,
        });
    }
    setText(e) {
        this.setState({
            text: e.target.value
        })
    }
    render() {
        return <div className='single-event'>
                <div className='single-event-minimal'>
                    <img className='check' src={check} onClick={this.completeEvent.bind(this)}></img>
                    <span className='single-event-title' onClick={this.displayInterface.bind(this)}>{this.state.title}</span>
                </div>
                <div className='single-event-details' style={{display: this.state.interfaceDisplay}}>
                    <textarea className='single-event-text' value={this.state.text} onChange={this.setText.bind(this)}></textarea>
                    <div className='single-event-icons'>
                        <img onClick={this.displayCalendar.bind(this)} className='single-event-icon' src={calendarIcon}/>
                        <img onClick={this.displayLabels.bind(this)} className='single-event-icon' src={labelIcon}/>
                        <img onClick={this.displayProjects.bind(this)} className='single-event-icon' src={projectIcon}/>
                        <img onClick={this.displayPriority.bind(this)} className='single-event-icon' src={priorityIcon}/>
                        <img onClick={this.confirmChange.bind(this)} src={confirmIcon} className='confirm-icon'/>
                        <Calendar 
                            type={SINGLE_DATE_CALENDAR} 
                            display={this.state.calendarDisplay}
                            setActiveDate={setActiveDate.bind(this)} 
                            markDate={this.state.markDate} 
                            activeDate={this.state.activeDate}
                            goToPrevMonth={goToPrevMonth.bind(this)}
                            goToNextMonth={goToNextMonth.bind(this)}
                            goToPrevYear={goToPrevYear.bind(this)}
                            goToNextYear={goToNextYear.bind(this)}/>
                        <EventLabelSelection display={this.state.labelsDisplay} activeLabels={this.state.activeLabels} setActiveLabels={this.setActiveLabels.bind(this)}/>
                        <EventProjectSelection display={this.state.projectsDisplay} activeProjects={this.state.activeProjects} setActiveProjects={this.setActiveProjects.bind(this)}/>
                        <EventPrioritySelection display={this.state.priorityDisplay} activePriority={this.state.activePriority} setActivePriority={this.setActivePriority.bind(this)}/>
                    </div>
                </div>
            </div>
    }
}

export default SingleEvent;