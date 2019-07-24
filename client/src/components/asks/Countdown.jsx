import React from 'react'

class Countdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      secs: 0,
      mins: 0,
      hrs: 0,
      days: 0,
      inter: null
    }
  }
  componentDidMount() {
    this.inter = setInterval(() => {
      const msLeft = this.props.deadline - Date.now()
      const daysLeft = Math.floor(msLeft / 1000 / 60 / 60 / 24)
      const hrsLeft = Math.floor(msLeft / 1000 / 60 / 60) - daysLeft * 24
      const minsLeft =
        Math.floor(msLeft / 1000 / 60) - hrsLeft * 60 - daysLeft * 24 * 60
      const secsLeft =
        Math.floor(msLeft / 1000) -
        hrsLeft * 60 * 60 -
        minsLeft * 60 -
        daysLeft * 24 * 60 * 60
      this.setState({
        secs: secsLeft < 10 ? '0' + secsLeft : secsLeft,
        mins: minsLeft < 10 ? '0' + minsLeft : minsLeft,
        hrs: hrsLeft < 10 ? '0' + hrsLeft : hrsLeft,
        days: daysLeft
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.inter)
  }

  render() {
    return (
      <div
        className="drop-shadow countdown"
        // style={{
        //   background: 'white',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   border: '1px solid #c2c2c2',
        //   borderRadius: 5,
        //   padding: 5,
        //   minWidth: 176,
        //   marginTop: 10
        // }}
      >
        <p
          className="detail-text"
          style={{
            margin: 0
          }}
        >
          Time remaining
        </p>
        <div
          style={{
            marginTop: 3
          }}
        >
          <span>{`${this.state.days} ${
            this.state.days === 1 ? 'day' : 'days'
          } `}</span>
          <span>{`${this.state.hrs}h `}</span>
          <span>{`${this.state.mins}m `}</span>
          <span>{`${this.state.secs}s`}</span>
        </div>
      </div>
    )
  }
}

export default Countdown
