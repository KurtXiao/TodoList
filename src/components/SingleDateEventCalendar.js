import React from 'react';

class SingleDateEventCalendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.backgroundColor === 'transparent') {
            return <div onClick={this.props.setActiveDate.bind(null, this.props.date)} className='grid-cell-event-calendar'>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor}}>
                {this.props.date}
                </div>
            </div>;
        }
        else {
            return <div onClick={this.props.setActiveDate.bind(null, this.props.date)} className='grid-cell-event-calendar'>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor,
                marginLeft: '22%',
                height: '16px',
                width: '16px',
                borderRadius: '50%'}}>
                {this.props.date}
                </div>
            </div>;
        }
    }
}

export default SingleDateEventCalendar;