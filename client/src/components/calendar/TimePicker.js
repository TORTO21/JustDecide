import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import dateFns from 'date-fns';
import './TimePicker.css';
import TimePickerUp from '../icons/TimePickerUp.png';
import TimePickerDown from '../icons/TimePickerDown.png';
import { throwServerError } from 'apollo-link-http-common';

class TimePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: new Date(),
      hr: new Date(),
      min: new Date(),
      meridiemIndicator: "PM"
    }
    this.meridiemToggle = this.meridiemToggle.bind(this)
    this.prevHour = this.prevHour.bind(this)
    this.nextHour = this.nextHour.bind(this)
    this.prevMin = this.prevMin.bind(this)
    this.nextMin = this.nextMin.bind(this)
  }

  prevHour() {
    let prevHour = dateFns.subHours(this.state.now, 1)
    this.setState({
      now: prevHour,
      hr: prevHour
    })
  }

  nextHour() {
    let nextHour = dateFns.addHours(this.state.now, 1)
    this.setState({
      now: nextHour,
      hr: nextHour
    })
  }

  prevMin() {
    let prevMin = dateFns.subMinutes(this.state.now, 1)
    this.setState({
      now: prevMin,
      min: prevMin
    })
  }

  nextMin() {
    let nextMin = dateFns.addMinutes(this.state.now, 1)
    this.setState({
      now: nextMin,
      min: nextMin
    })
  }

  meridiemToggle() {
    let format = "A"
    if (this.state.meridiemIndicator === "PM") {
      this.setState({ meridiemIndicator: "AM" })
    } else {
      this.setState({ meridiemIndicator: "PM" })
    }
  }

  render() {
    const hrFormat = "hh"
    const minFormat = "mm"
    const meridiemFormat = "A"
    if (dateFns.format(new Date(), meridiemFormat) === "AM") {
      this.setState({ meridiemIndicator: "AM"})
    } 
    return (
      <div className="time-picker-container">
        <div className="time-picker">
          <div className="input-group">
            <div className="time-input">
              <img 
                src={TimePickerUp} 
                className="time-arrows"
                onClick={this.nextHour}></img>
              {dateFns.format(this.state.hr, hrFormat)}
              <img 
                src={TimePickerDown} 
                className="time-arrows"
                onClick={this.prevHour}></img>
            </div>
            <div className="time-input">
              <img 
                src={TimePickerUp} 
                className="time-arrows"
                onClick={this.nextMin}></img>
              {dateFns.format(this.state.now, minFormat)}
              <img 
                src={TimePickerDown} 
                className="time-arrows"
                onClick={this.prevMin}></img>
            </div>
            <div className="time-input">
              <img 
                src={TimePickerUp} 
                className="time-arrows"
                onClick={this.meridiemToggle}></img>
              {this.state.meridiemIndicator}
              <img 
                src={TimePickerDown} 
                className="time-arrows"
                onClick={this.meridiemToggle}></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimePicker;