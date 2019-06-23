const _ = require('lodash')
const { merge } = _

const ask = require('./ask_mutation')
const contact = require('./contact_mutation')
const group = require('./group_mutation')
const invitation = require('./invitation_mutation')
const user = require('./user_mutation')
const vote = require('./vote_mutation')

module.exports = merge(ask, contact, group, invitation, user, vote)
