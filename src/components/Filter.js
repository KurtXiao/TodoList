import React from "react";
import AddEventCalendar from './AddEventCalendar';
import AddEventLabelSelection from './AddEventLabelSelection';
import AddEventProjectSelection from './AddEventProjectSelection';
import AddEventPrioritySelection from './AddEventPrioritySelection';
import SingleDateAddEvent from './SingleDateAddEvent';
import calendarIcon from '../images/calendar.png';
import labelIcon from '../images/label.png';
import projectIcon from '../images/project.png';
import priorityIcon from '../images/priority.png';
import controlSign from '../images/control.png';
import confirmIcon from '../images/confirm.png';
import filterIcon from '../images/filter.png';
import store from '../store';
import { dateToDateObj, getMonthYear, getPreviousMonthDateObj, getNextMonthDateObj, getPreviousYearDateObj, getNextYearDateObj, getLastMonthTotalDates, getCurrMonthTotalDates, getCurrMonthStartingDay, getNextMonthStartingDay} from '../utils/calendar';
import { setDisplayConditions, filterDisplayEvents } from '../actions/displayArea';

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
    getDates(markDate, activeDate) {
        let arr = [];
        let lastMonthTotalDates = getLastMonthTotalDates(markDate);
        let currMonthTotalDates = getCurrMonthTotalDates(markDate);
        let currMonthStartingDay = getCurrMonthStartingDay(markDate);
        let nextMonthStartingDay = getNextMonthStartingDay(markDate);
        for(let i = lastMonthTotalDates - currMonthStartingDay + 1; i <= lastMonthTotalDates; ++i) {
            arr.push(<SingleDateAddEvent key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={this.setActiveDate.bind(this)}/>)
        }
        for(let i = 1; i <= currMonthTotalDates; ++i) {
            if(getMonthYear(markDate) === getMonthYear(activeDate) && i === activeDate[2]) arr.push(<SingleDateAddEvent key={Math.random()} date={i} backgroundColor={'lightblue'} fontColor={'white'} setActiveDate={this.setActiveDate.bind(this)}/>)
            else arr.push(<SingleDateAddEvent key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'black'} setActiveDate={this.setActiveDate.bind(this)}/>)
            
        }
        for(let i = 1; i <= 7 - nextMonthStartingDay; ++i) {
            arr.push(<SingleDateAddEvent key={Math.random()} date={i} backgroundColor={'transparent'} fontColor={'grey'} setActiveDate={this.setActiveDate.bind(this)}/>);
        }
        return arr;
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
                    <AddEventCalendar
                        display={this.state.calendarDisplay}
                        goToPrevMonth={this.goToPrevMonth.bind(this)}
                        goToNextMonth={this.goToNextMonth.bind(this)}
                        goToPrevYear={this.goToPrevYear.bind(this)}
                        goToNextYear={this.goToNextYear.bind(this)}
                        markDate={this.state.markDate}
                        activeDate={this.state.activeDate}
                        setActiveDate={this.setActiveDate.bind(this)}
                        getDates={this.getDates.bind(this)}/>
                    <AddEventLabelSelection display={this.state.labelsDisplay} activeLabels={this.state.activeLabels} setActiveLabels={this.setActiveLabels.bind(this)}/>
                    <AddEventProjectSelection display={this.state.projectsDisplay} activeProjects={this.state.activeProjects} setActiveProjects={this.setActiveProjects.bind(this)}/>
                    <AddEventPrioritySelection display={this.state.priorityDisplay} activePriority={this.state.activePriority} setActivePriority={this.setActivePriority.bind(this)}/>
                </div>
            </div>
    }
}

export default Filter;