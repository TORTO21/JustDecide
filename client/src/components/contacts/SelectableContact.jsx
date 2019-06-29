import React, { useEffect, useState } from 'react'

export default ({ contact, onSelect, selected }) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => setChecked(selected.indexOf(contact.id) !== -1), [
    contact.id,
    selected
  ])

  const handleClick = () => {
    setChecked(!checked)
    onSelect()
  }

  const checkedClass = checked ? 'checkedButton' : 'unCheckedButton'

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: ' 1px solid #d4d4d4',
        paddingBottom: 3,
        marginTop: 11
      }}
    >
      <div className="text">{contact.name}</div>
      <div className={checkedClass} onClick={handleClick} />
    </div>
  )
}
