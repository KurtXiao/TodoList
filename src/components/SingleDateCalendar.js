import React from 'react';

class SingleDateCalendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.backgroundColor === 'transparent') {
            return <div onClick={this.props.setActiveDate.bind(null, this.props.date)} className='grid-cell'>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor}}>
                {this.props.date}
                </div>
            </div>;
        }
        else {
            return <div onClick={this.props.setActiveDate.bind(null, this.props.date)} className='grid-cell'>
                <div style={{
                color: this.props.fontColor,
                backgroundColor: this.props.backgroundColor,
                marginLeft: '23%',
                height: '37px',
                width: '37px',
                borderRadius: '50%'}}>
                {this.props.date}
                </div>
            </div>;
        }
    }
}

export default SingleDateCalendar;