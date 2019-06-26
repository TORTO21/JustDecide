import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import dateFns from 'date-fns';
import './TimePicker.css';
import TimePickerUp from '../icons/TimePickerUp.png';
import TimePickerDown from '../icons/TimePickerDown.png';

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
  }

  prevHour() {

  }

  nextHour() {

  }

  prevMin() {

  }

  nextMin() {

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
    const hrFormat = "HH"
    const minFormat = "MM"
    const meridiemFormat = "A"
    if (dateFns.format(new Date(), meridiemFormat) === "AM") {
      this.setState({ meridiemIndicator: "AM"})
    } 
    return (
      <div className="time-picker-container">
        <div className="time-picker">
          <div className="input-group">
            <div className="time-input">
              <img src={TimePickerUp} className="time-arrows"></img>
              {dateFns.format(this.state.hr, hrFormat)}
              <img src={TimePickerDown} className="time-arrows"></img>
            </div>
            <div className="time-input">
              <img src={TimePickerUp} className="time-arrows"></img>
              {dateFns.format(this.state.min, minFormat)}
              <img src={TimePickerDown} className="time-arrows"></img>
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