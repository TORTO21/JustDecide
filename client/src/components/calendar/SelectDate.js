import React from 'react';
import gql from 'graphql-tag';
import './Calendar.css';
import dateFns from 'date-fns';
import { Mutation, ApolloProvider, ApolloConsumer } from 'react-apollo';

class SelectDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    }
    this.handleNext = this.handleNext.bind(this);
    this.updateCache = this.updateCache.bind(this);
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            chevron_right
          </div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i= 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className="days row">{days}</div>
  }

  renderDates() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
              ? "disabeled"
              : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    })
  }

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    })
  }

  createDateString() {
    let dS = (this.state.selectedDate.getMonth() + 1).toString() + " " +
      this.state.selectedDate.getDate().toString() + " " +
      this.state.selectedDate.getFullYear().toString()
    console.log(dS)
    return dS
  }

  updateCache(client) {
    const dateString = this.createDateString()
    // here we also need to write to local storage
    client.writeData({
      data: { askDate: dateString } 
    })
    console.log(client)
  }

  handleNext() {
    // console.log(this.state.selectedDate.getMonth())
    // console.log(this.state.selectedDate.getDate())
    // console.log(this.state.selectedDate.getFullYear())
  }

  render() {
    
    return (
      <ApolloConsumer>
        {(client) => {
          return(
            <div className="calendar">
              {this.renderHeader()}
              {this.renderDays()}
              {this.renderDates()}
              <button 
                className="solid-pink-button"
                onClick={() => this.updateCache(client)}>
                Next
              </button>
            </div>
          )
        }} 
      </ApolloConsumer>
    )
  }

}

export default SelectDate;