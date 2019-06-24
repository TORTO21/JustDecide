const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  phone_number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 32
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
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ phone_number: 1 })

const User = mongoose.model('user', UserSchema)
module.exports = User
