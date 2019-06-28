import React, { useState } from 'react'

export default ({ contact, onSelect }) => {
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked(!checked)
    onSelect()
  }

  return (
    <div
      className="pretty p-icon p-round p-pulse"
      style={{
        display: 'block',
        fontSize: 21,
        margin: '10px 0'
      }}
    >
      <input type="checkbox" checked={checked} onChange={handleClick} />
      <div className="state p-success">
        <i className="icon mdi mdi-check" />
        <label>{contact.name}</label>
      </div>
    </div>
  )
}
