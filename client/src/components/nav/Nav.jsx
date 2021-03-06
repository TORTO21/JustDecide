import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'
import React from 'react'
import { withRouter } from 'react-router-dom'

const Nav = ({ history }) => (
  <div className="nav">
    <div className="back-btn" onClick={() => history.goBack()} />
    <Logout />
    <Link className="button" to="/asks">
      <svg
        width="30"
        height="28"
        viewBox="0 0 60 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.4674 22.0386L30 5.50598L46.5326 22.0386H46.529V49.5868H13.4711V22.0386H13.4674ZM7.9615 27.5445L3.89311 31.6129L0 27.7198L26.1074 1.61237C28.2572 -0.537456 31.7428 -0.537456 33.8926 1.61237L60 27.7198L56.1069 31.6129L52.0386 27.5446V49.5868C52.0386 52.6297 49.5719 55.0964 46.529 55.0964H13.4711C10.4282 55.0964 7.9615 52.6297 7.9615 49.5868V27.5445Z"
          fill="white"
        />
      </svg>
    </Link>
  </div>
)

export default withRouter(Nav)
