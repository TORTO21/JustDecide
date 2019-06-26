import React from 'react';
import './Calendar.css';
import dateFns from 'date-fns';
import { ApolloConsumer } from 'react-apollo';
import RightArrow from '../icons/RightArrow.png';
import LeftArrow from '../icons/LeftArrow.png';
import DblLeftArrow from '../icons/DblLeftArrow.png';
import DblRightArrow from '../icons/DblRightArrow.png';
import TimePicker from './TimePicker';

class SelectDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      today: new Date(),
      currentWeekStart: dateFns.startOfWeek(new Date()),
      currentWeekEnd: dateFns.endOfWeek(new Date())
    }
    this.handleNext = this.handleNext.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
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
          <img
            src={DblLeftArrow}
            className="dbl-left-arrow"
            onClick={this.prevMonth}>
          </img>
          <img
            src={LeftArrow}
            className="arrow"
            onClick={this.prevWeek}>
          </img>
        </div>
        <div className="col col-center month-year">
          {/* <div onClick={this.handleMonthClick}> */}
            {dateFns.format(this.state.currentMonth, dateFormat)}
          {/* </div> */}
        </div>
        <div className="col col-end">
          <img 
            src={RightArrow}
            className="arrow"
            onClick={this.nextWeek}>
          </img>
          <img
            src={DblRightArrow}
            className="dbl-right-arrow"
            onClick={this.nextMonth}>
          </img>
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
            className="col cell"
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay), currentWeekStart)}>
            <span className={`number ${!dateFns.isSameMonth(day, monthStart) 
              ? " disabeled" : dateFns.isSameDay(day, selectedDate) 
              ? "selected" : ""}`}>{formattedDate}
            </span>
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

  nextWeek() {
    let nextWeek = dateFns.addWeeks(this.state.today, 1)
    let nextWeekStart = dateFns.startOfWeek(nextWeek)
    let nextWeekEnd = dateFns.endOfWeek(nextWeek)
    this.setState({
      today: nextWeek,
      currentWeekStart: nextWeekStart,
      currentWeekEnd: nextWeekEnd,
      currentMonth: nextWeek
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
      currentWeekEnd: prevWeekEnd,
      currentMonth: prevWeek
    })
    return prevWeek
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
    });
  };

  nextMonth = () => {
    let oneMonthForward = dateFns.addMonths(this.state.currentMonth, 1)
    let newWeekStart = dateFns.startOfWeek(oneMonthForward)
    let newWeekEnd = dateFns.endOfWeek(oneMonthForward)
    this.setState({
      currentMonth: oneMonthForward,
      currentWeekStart: newWeekStart,
      currentWeekEnd: newWeekEnd
    })
  }

  prevMonth = () => {
    let oneMonthPrev = dateFns.subMonths(this.state.currentMonth, 1)
    let newWeekStart = dateFns.startOfWeek(oneMonthPrev)
    let newWeekEnd = dateFns.endOfWeek(oneMonthPrev)
    this.setState({
      currentMonth: oneMonthPrev,
      currentWeekStart: newWeekStart,
      currentWeekEnd: newWeekEnd
    })
  }

  createDateString() {
    const moFormat = "MM"
    const dateFormat = "DD"
    const yrFormat = "YYYY"
    const date = (dateFns.format(this.state.currentMonth, moFormat) 
      + " " + 
      dateFns.format(this.state.selectedDate, dateFormat)
      + " " +
      dateFns.format(this.state.currentMonth, yrFormat))

    const time = window.localStorage.getItem("time") 
    const dateString = date + " " + time 
    console.log(dateString)
    return (dateString)
  }

  updateCache(client) {
    const dateString = this.createDateString()
    window.localStorage.setItem("date", dateString)
    client.writeData({
      data: { askDate: dateString } 
    })
    console.log(window.localStorage.getItem("time"))
    console.log(window.localStorage.getItem("date"))
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
            <div className="background">
              <div className="section-header cal-header">Set the Date</div>
              <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderDates()}
              </div>
              <div className="cal-button-container">
                <button 
                  className="solid-pink-button calendar-button"
                  onClick={() => this.updateCache(client)}>
                  Next
                </button>
              </div>
              <TimePicker />
            </div>
          )
        }} 
      </ApolloConsumer>
    )
  }

}

export default SelectDate;