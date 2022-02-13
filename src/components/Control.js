import React from 'react';
import '../styles/Control.css';
import AllItems from './AllItems';
import AddEvent from './AddEvent';
import SelectProject from './SelectProject';
import Filter from './Filter';
import labelSign from '../images/label.png';
import projectSign from '../images/project.png';
import { LABEL_ITEM, PROJECT_ITEM } from "../utils/constants";

const Control = () => {
    return <div id="control">
        <AllItems type={LABEL_ITEM} itemSign={labelSign}/>
        <AllItems type={PROJECT_ITEM} itemSign={projectSign} />
        <AddEvent />
        <SelectProject />
        <Filter />
    </div>; 
}

export default Control;