const mongoose = require('mongoose')

const { Schema } = mongoose

const AskSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  moniker_id: {
    type: Schema.Types.ObjectId,
    ref: 'moniker',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  use_date: {
    type: Boolean,
    default: true
  },
  use_time: {
    type: Boolean,
    default: true
  },
  date: {
    type: Number // store as ms
  },
  deadline: {
    type: Number // store as ms
  },
  invitations: {
    type: [Schema.Types.ObjectId],
    ref: 'invitation'
  },
  options: {
    type: [Schema.Types.ObjectId],
    ref: 'option'
  }
})

const Ask = mongoose.model('ask', AskSchema)
module.exports = Ask
