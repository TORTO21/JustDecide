import React from 'react';
import gql from 'graphql-tag';
import './Calendar.css';
import dateFns, { getISOWeek, isThisISOWeek } from 'date-fns';
import { Mutation, ApolloProvider, ApolloConsumer } from 'react-apollo';

class SelectDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      today: new Date(),
      currentWeekStart: dateFns.startOfWeek(new Date()),
      currentWeekEnd: dateFns.endOfWeek(new Date()),
      monthSelector: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentWeekStart !== prevState.currentWeekStart) {
      this.renderDates();
    }
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevWeek}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <div onClick={this.handleMonthClick}>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </div>
          {/* <span>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span> */}
        </div>
        <div className="col col-end">
          <div className="icon" onClick={this.nextWeek}>
            chevron_right
          </div>
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = "ddd";
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
    const today = new Date() 

    const currentWeekStart = this.state.currentWeekStart
    const currentWeekEnd = this.state.currentWeekEnd

 
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = currentWeekStart;
    let formattedDate = "";

    while (day <= currentWeekEnd) {
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
            onClick={() => this.onDateClick(dateFns.parse(cloneDay), currentWeekStart)}>
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

  renderMonthSelector() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if (this.state.monthSelector === true) {
      months.forEach(month => {
        return (
          <div className="month-selector">
            Testing
            <ul>
              {month}
            </ul>
          </div>
        )
      })
    }
  }

  nextWeek() {
    let nextWeek = dateFns.addWeeks(this.state.today, 1)
    let nextWeekStart = dateFns.startOfWeek(nextWeek)
    let nextWeekEnd = dateFns.endOfWeek(nextWeek)
    this.setState({
      today: nextWeek,
      currentWeekStart: nextWeekStart,
      currentWeekEnd: nextWeekEnd
    })
    return nextWeek
  }

  prevWeek() {
    let prevWeek = dateFns.subWeeks(this.state.today, 1)
    let prevWeekStart = dateFns.startOfWeek(prevWeek)
    let prevWeekEnd = dateFns.endOfWeek(prevWeek)
    this.setState({
      today: prevWeek,
      currentWeekStart: prevWeekStart,
      currentWeekEnd: prevWeekEnd 
    })
    return prevWeek
  }

  handleMonthClick() {
    this.setState({
      monthSelector: true
    })
  }

  onDateClick = (day) => {
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
              {this.renderMonthSelector()}
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