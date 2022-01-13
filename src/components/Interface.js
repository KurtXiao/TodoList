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
import { dateToDateObj } from '../utils/calendar';

class Interface extends React.Component {
  constructor(props) {
    super(props);
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
      <div id='calendar-container'><Calendar/></div>
      <div id="flex-container">
        <Display />
        <Project />
        <Control />
      </div>
    </div>
  }
}

export default Interface;