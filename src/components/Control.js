import React from 'react';
import '../styles/Control.css';
import AllLabels from './AllLabels';
import AllProjects from './AllProjects';
import AddEvent from './AddEvent';
import SelectProject from './SelectProject';
import Filter from './Filter';

class Control extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div id="control">
            <AllLabels />
            <AllProjects />
            <AddEvent />
            <SelectProject />
            <Filter />
        </div>;
    }
}

export default Control;