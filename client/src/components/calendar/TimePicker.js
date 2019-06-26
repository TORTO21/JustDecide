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
      meridiemIndicator: new Date() 
    }
  }

  render() {
    const hrFormat = "HH"
    const minFormat = "MM"
    const meridiemFormat = "A"
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
              <img src={TimePickerUp} className="time-arrows"></img>
              {dateFns.format(this.state.meridiemIndicator, meridiemFormat)}
              <img src={TimePickerDown} className="time-arrows"></img>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TimePicker;