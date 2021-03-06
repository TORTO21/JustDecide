import './Calendar.css'

import { ApolloConsumer } from 'react-apollo'
import DblLeftArrow from '../icons/DblLeftArrow.png'
import DblRightArrow from '../icons/DblRightArrow.png'
import { FETCH_ASK_DETAILS } from '../../graphql/queries/ask_queries'
import LeftArrow from '../icons/LeftArrow.png'
import { Query } from 'react-apollo'
import React from 'react'
import RightArrow from '../icons/RightArrow.png'
import TimePicker from './TimePicker'
import dateFns from 'date-fns'

class SelectDate extends React.Component {
  constructor(props) {
    super(props)

    const dateToUse = this.props.data.askDate
      ? new Date(this.props.data.askDate)
      : new Date()

    this.state = {
      currentMonth: dateToUse,
      selectedDate: dateToUse,
      today: dateToUse,
      currentWeekStart: dateFns.startOfWeek(dateToUse),
      currentWeekEnd: dateFns.endOfWeek(dateToUse),
      time: ''
    }
    this.updateCache = this.updateCache.bind(this)
    this.nextWeek = this.nextWeek.bind(this)
    this.prevWeek = this.prevWeek.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentWeekStart !== prevState.currentWeekStart) {
      this.renderDates()
    }
  }

  renderHeader() {
    const monthOnly = 'MMMM'
    const yearOnly = 'YYYY'

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <img
            src={DblLeftArrow}
            className="dbl-left-arrow"
            onClick={this.prevMonth}
            alt="double left arrow"
          />
          <img
            src={LeftArrow}
            className="arrow"
            onClick={this.prevWeek}
            alt="left-arrow"
          />
        </div>
        <div className="col col-center month-year">
          {dateFns.format(this.state.currentMonth, monthOnly)}
          <br />
          {dateFns.format(this.state.currentMonth, yearOnly)}
        </div>
        <div className="col col-end">
          <img
            src={RightArrow}
            className="arrow"
            onClick={this.nextWeek}
            alt="right-arrow"
          />
          <img
            src={DblRightArrow}
            className="dbl-right-arrow"
            onClick={this.nextMonth}
            alt="double right arrow"
          />
        </div>
      </div>
    )
  }

  renderDays() {
    const dateFormat = 'ddd'
    const days = []

    let startDate = dateFns.startOfWeek(this.state.currentMonth)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      )
    }
    return <div className="days row">{days}</div>
  }

  renderDates() {
    const { currentMonth, selectedDate } = this.state
    const monthStart = dateFns.startOfMonth(currentMonth)

    const currentWeekStart = this.state.currentWeekStart
    const currentWeekEnd = this.state.currentWeekEnd

    const dateFormat = 'D'
    const rows = []

    let days = []
    let day = currentWeekStart
    let formattedDate = ''

    while (day <= currentWeekEnd) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat)
        const cloneDay = day
        days.push(
          <div
            className="col cell"
            key={day}
            onClick={() =>
              this.onDateClick(dateFns.parse(cloneDay), currentWeekStart)
            }
          >
            <span
              className={`number ${
                !dateFns.isSameMonth(day, monthStart)
                  ? ' disabeled'
                  : dateFns.isSameDay(day, selectedDate)
                  ? 'selected'
                  : ''
              }`}
            >
              {formattedDate}
            </span>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }
      rows.push(
        <div className="row dates-row" key={day}>
          {days}
        </div>
      )
      days = []
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
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    })
  }

  nextMonth = () => {
    let oneMonthForward = dateFns.addMonths(this.state.currentMonth, 1)
    let newWeekStart = dateFns.startOfWeek(oneMonthForward)
    let newWeekEnd = dateFns.endOfWeek(oneMonthForward)
    this.setState({
      today: oneMonthForward,
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
      today: oneMonthPrev,
      currentMonth: oneMonthPrev,
      currentWeekStart: newWeekStart,
      currentWeekEnd: newWeekEnd
    })
  }

  createDateString() {
    const moFormat = 'MM'
    const dateFormat = 'DD'
    const yrFormat = 'YYYY'
    const date =
      dateFns.format(this.state.currentMonth, moFormat) +
      ' ' +
      dateFns.format(this.state.selectedDate, dateFormat) +
      ' ' +
      dateFns.format(this.state.currentMonth, yrFormat)

    const time = window.localStorage.getItem('time')
    const dateString = date + ' ' + time
    return dateString
  }

  updateCache(client) {
    const dateString = this.createDateString()

    client.writeData({
      data: { askDate: dateString }
    })

    this.props.history.push('/deadlineDate')
  }

  render() {
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div>
              <div className="section-header cal-header">Set the Date</div>
              <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderDates()}
              </div>
              <TimePicker saveTime={this.saveTime} />
              <div className="cal-button-container">
                <button
                  className="solid-pink-button calendar-button"
                  onClick={() => this.updateCache(client)}
                >
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

const WithExistingAnswers = ({ history }) => (
  <Query query={FETCH_ASK_DETAILS}>
    {({ loading, data }) => {
      if (loading) return null
      return <SelectDate data={data} history={history} />
    }}
  </Query>
)

export default WithExistingAnswers
