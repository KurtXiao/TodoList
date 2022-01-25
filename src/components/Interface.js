import React from 'react';
import '../styles/Interface.css';
import Calendar from './Calendar';
import Display from './Display';
import Project from './Project';
import Control from './Control';
import store from '../store';
import { getState } from '../utils/redux';
import { postToServer } from '../utils/server';
import { setState } from '../actions/allEvents';
import { selectProject, filterProject } from '../actions/projectArea';
import { setDisplayConditions, filterDisplayEvents } from '../actions/displayArea';
import { dateToDateObj, setActiveDate, goToPrevYear, goToNextYear, goToPrevMonth, goToNextMonth} from '../utils/calendar';
import { OVERALL_CALENDAR } from '../utils/constants';

class Interface extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markDate: dateToDateObj(new Date()),
      activeDate: dateToDateObj(new Date()),
    }
  }
  async componentDidMount() {
    let res = await postToServer('/getState', {username: store.getState().userInfo.username});
    await store.dispatch(setState(getState(res)));
    await store.dispatch(selectProject(store.getState().allEvents.projects[0] || ""));
    await store.dispatch(filterProject(store.getState().allEvents.events));
    await store.dispatch(setDisplayConditions({activeDate: dateToDateObj(new Date())}));
    await store.dispatch(filterDisplayEvents(store.getState().allEvents.events));
  }
  render() {
    return <div>
      <div id='calendar-container'>
      <Calendar 
        type={OVERALL_CALENDAR} 
        display={'block'} 
        setActiveDate={setActiveDate.bind(this)} 
        markDate={this.state.markDate} 
        activeDate={this.state.activeDate}
        goToPrevMonth={goToPrevMonth.bind(this)}
        goToNextMonth={goToNextMonth.bind(this)}
        goToPrevYear={goToPrevYear.bind(this)}
        goToNextYear={goToNextYear.bind(this)}/>
      </div>
      <div id="flex-container">
        <Display />
        <Project />
        <Control />
      </div>
    </div>
  }
}

export default Interface;