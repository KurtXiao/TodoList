import React from 'react';


class SingleDateAddEvent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div onClick={this.props.setActiveDate.bind(null, this.props.date)} className='grid-cell-event-calendar' style={{
            color: this.props.fontColor,
            backgroundColor: this.props.backgroundColor}}>
            {this.props.date}
        </div>;
    }
}

export default SingleDateAddEvent;