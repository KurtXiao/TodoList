import React from 'react';
import '../styles/SingleEvent.css';
import '../styles/AddEvent.css';
import addition from '../images/addition.png';
import calendarIcon from '../images/calendar.png';
import labelIcon from '../images/label.png';
import projectIcon from '../images/project.png';
import priorityIcon from '../images/priority.png';
import confirmIcon from '../images/confirm.png';
import controlSign from '../images/control.png';
import EventLabelSelection from './EventLabelSelection';
import EventProjectSelection from './EventProjectSelection';
import EventPrioritySelection from './EventPrioritySelection';
import { addEvent } from '../utils/redux';
import { updateState } from '../utils/server';
import store from '../store';
import { filterProject } from '../actions/projectArea';
import { filterDisplayEvents } from '../actions/displayArea';
import { dateToDateObj, setActiveDate, goToPrevYear, goToNextYear, goToPrevMonth, goToNextMonth} from '../utils/calendar';
import Calendar from './Calendar';
import { SINGLE_DATE_CALENDAR } from '../utils/constants';

class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            interfaceDisplay: 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
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
    async addEvent() {
        if(this.state.title === '') {
            alert('Title must not be empty!');
            return;
        }
        if(this.state.text === '') {
            alert('Content must not be empty!');
            return;
        }
        await addEvent(this.state.title, this.state.text, this.state.activeDate, this.state.activeLabels, this.state.activeProjects, this.state.activePriority);
        updateState();
        await this.setState({
            title: '',
            text: '',
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            interfaceDisplay: 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
            activeLabels: [],
            activeProjects: [],
            activePriority: [],
        });
        await store.dispatch(filterProject(store.getState().allEvents.events));
        await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
    }
    async displayAddEventInterface() {
        await this.setState({
            title: '',
            text: '',
            calendarDisplay: 'none',
            labelsDisplay: 'none',
            projectsDisplay: 'none',
            priorityDisplay: 'none',
            interfaceDisplay: this.state.interfaceDisplay === 'none' ? 'block' : 'none',
            markDate: dateToDateObj(new Date()),
            activeDate: dateToDateObj(new Date()),
            activeLabels: [],
            activeProjects: [],
            activePriority: 'p4',
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
    render() {
        return <div>
                    <div className='event-adder-wrapper' onClick={this.displayAddEventInterface.bind(this)}>
                        <img className="addition-arrow" src={controlSign}/>
                        <span className='event-adder-text'>New Event</span>
                        <img className='event-adder-img' src={addition}></img>
                    </div>
                    <div className='single-event' style={{display: this.state.interfaceDisplay}}>
                        <div className='single-event-minimal'>
                            <input name="title" value={this.state.title} onChange={this.handleInputChange.bind(this)} className='single-event-title-input' />
                        </div>
                        <div className='single-event-details'>
                            <textarea name="text" value={this.state.text} onChange={this.handleInputChange.bind(this)} className='single-event-text'></textarea>
                            <div className='single-event-icons'>
                                <img onClick={this.displayCalendar.bind(this)} className='single-event-icon' src={calendarIcon}/>
                                <img onClick={this.displayLabels.bind(this)} className='single-event-icon' src={labelIcon}/>
                                <img onClick={this.displayProjects.bind(this)} className='single-event-icon' src={projectIcon}/>
                                <img onClick={this.displayPriority.bind(this)} className='single-event-icon' src={priorityIcon}/>
                                <img onClick={this.addEvent.bind(this)} src={confirmIcon} className='confirm-icon'/>
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
            </div>
    }
}

export default AddEvent;