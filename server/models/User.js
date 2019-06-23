const mongoose = require('mongoose')

const { Schema } = mongoose.Schema

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
  contacts: {
    type: [Schema.Types.ObjectId],
    ref: 'user'
  },
  groups: {
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
  }
})

const User = mongoose.model('user', UserSchema)
module.exports = User
