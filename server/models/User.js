const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  phone_hash: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['guest', 'registered']
  },
  asks: {
    type: [Schema.Types.ObjectId],
    ref: 'ask'
  },
  invitations: {
    type: [Schema.Types.ObjectId],
    ref: 'invitation'
  },
  groups: {
    type: [Schema.Types.ObjectId],
    ref: 'group'
  },
  memberships: {
    type: [Schema.Types.ObjectId],
    ref: 'group'
  },
  votes: {
    type: [Schema.Types.ObjectId],
    ref: 'vote'
  },
  options: {
    type: [Schema.Types.ObjectId],
    ref: 'option'
  },
  contacts: {
    type: [Schema.Types.ObjectId],
    ref: 'contact'
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User
