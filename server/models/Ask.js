const mongoose = require('mongoose')

const { Schema } = mongoose

const AskSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name_used_id: {
    type: Schema.Types.ObjectId,
    ref: 'contact',
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
    type: String // store as ms
  },
  deadline: {
    type: String // store as ms
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

AskSchema.index({ author_id: 1 })
AskSchema.index({ name_used_id: 1 })
AskSchema.index({ question: 1 })

const Ask = mongoose.model('ask', AskSchema)
module.exports = Ask
