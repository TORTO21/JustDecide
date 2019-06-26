import React from 'react';
import './Calendar.css';
import dateFns from 'date-fns';
import { ApolloConsumer } from 'react-apollo';
import RightArrow from '../icons/RightArrow.png';
import LeftArrow from '../icons/LeftArrow.png';
import PinkCheck from '../icons/PinkCheck.png';

class SelectDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      today: new Date(),
      currentWeekStart: dateFns.startOfWeek(new Date()),
      currentWeekEnd: dateFns.endOfWeek(new Date()),
      monthSelector: false, 
      selectState: false
    }
    this.handleNext = this.handleNext.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.handleMonthClick = this.handleMonthClick.bind(this);
    this.handleClearMonths = this.handleClearMonths.bind(this);
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
            src={LeftArrow}
            className="arrow"
            onClick={this.prevWeek}>
          </img>
        </div>
        <div className="col col-center month-year">
          <div onClick={this.handleMonthClick}>
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </div>
        </div>
        <div className="col col-end">
          <img 
            src={RightArrow}
            className="arrow"
            onClick={this.nextWeek}>
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
    // const today = new Date() 

    const currentWeekStart = this.state.currentWeekStart
    const currentWeekEnd = this.state.currentWeekEnd

 
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = currentWeekStart;
    let formattedDate = "";

    let dateCell;

    if (this.state.selectState === "false") {
      dateCell = (
        <>
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </>
      )
    } else {
      dateCell = (
        <img src={PinkCheck} className="calendar-pink-check"></img>
      )
    }

    while (day <= currentWeekEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabeled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ""}`}
            // className="col cell"
            // className={this.state.selectState === false ? "col cell" : "calendar-pink-check"}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay), currentWeekStart)}>
            <span className="number">{formattedDate}</span>
            {/* {dateCell} */}
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

  handleMonthClick() {
    this.setState({
      monthSelector: true
    })
  }

  onDateClick = (day) => {
    this.setState({
      selectedDate: day,
      selectState: true
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

  handleClearMonths(e) {
    // e.stopPropagation();
    this.setState({
      monthSelector: false
    })
  }

  render() {
    let months;
    const monthOptions = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if (this.state.monthSelector === true) {
      months = monthOptions.map((month, i) => {
        return (
          <li key={i} className="month">
            {month}
          </li>
        )
      })
    } else {
      months = ""
    }

    return (
      <ApolloConsumer>
        {(client) => {
          return(
            <div className="background">
              <div className="section-header cal-header">Set the Date</div>
              <div className="calendar">
                {this.renderHeader()}
                {/* <ul className="month-selector">
                  {months}
                </ul> */}
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
            </div>
          )
        }} 
      </ApolloConsumer>
    )
  }

}

export default SelectDate;