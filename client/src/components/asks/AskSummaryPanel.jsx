import React from 'react'
import { format } from 'date-fns'

const AskSummaryPanel = ({ ask }) => (
  <div
    className="drop-shadow text"
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '19px 30px',
      padding: '18px',
      alignSelf: 'stretch'
    }}
  >
    {ask.use_date && (
      <div>Date: {format(new Date(parseInt(ask.date)), 'MMMM D, YYYY')}</div>
    )}
    {ask.use_time && (
      <div>Time: {format(new Date(parseInt(ask.date)), 'h:mm A')}</div>
    )}
    <div>
      <div
        style={{
          fontSize: 17,
          textAlign: 'center',
          marginTop: 10
        }}
      >
        Participating:
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: 6
        }}
      >
        {ask.invitations
          .map(i => i.contact.name)
          .sort((a, b) => (a < b ? -1 : 1))
          .map((name, i) => (
            <li
              key={i}
              className="detail-text"
              style={{
                border: '1px solid #c4c4c4',
                padding: ' 0 7px',
                borderRadius: '14px',
                margin: '2px',
                textTransform: 'uppercase'
              }}
            >
              {name}
            </li>
          ))}
      </ul>
    </div>
  </div>
)

export default AskSummaryPanel
