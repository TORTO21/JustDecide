const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
    asks: {
    type: Schema.Types.ObjectId,
    ref: 'ask'
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: true
  },
<<<<<<< HEAD
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
  monikers: {
    type: [Schema.Types.ObjectId],
    ref: 'moniker'
  },
=======
>>>>>>> 51a2f3f55d13d9b36add8274ca7889bd431d0468
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema)
module.exports = User
