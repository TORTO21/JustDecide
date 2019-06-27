import OptionBar from './OptionBar'
import React from 'react'

const OptionsList = ({ ask, history }) => {
  const barColors = ['ochre', 'pink', 'turquoise', 'plum']

  const { options, invitations } = ask

  const netVote = option => {
    return option.votes.reduce(
      (acc, vote) => acc + (vote.direction === 'up' ? 1 : 0),
      0
    )
  }

  const winningVotes = options.reduce((acc, option) => {
    const opt_vote = netVote(option)
    if (opt_vote > acc) return opt_vote
    return acc
  }, 0)

  const barPct = option => Math.max(netVote(option) / winningVotes, 0.15)

  const orderedOptions = options.sort((a, b) => barPct(b) - barPct(a))

  return (
    <div
      style={{
        paddingTop: 37,
        width: '100%'
      }}
    >
      {orderedOptions.map((option, idx) => (
        <OptionBar
          key={option.id}
          option={option}
          colorClass={barColors[idx % 4]}
          barPct={barPct(option)}
          history={history}
          invitations={invitations}
          ask_id={ask.id}
        />
      ))}
    </div>
  )
}

export default OptionsList
