const mongoose = require('mongoose')

const { Schema } = mongoose

const VoteSchema = new Schema({
  option_id: {
    type: Schema.Types.ObjectId,
    ref: 'option',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  direction: {
    type: String,
    enum: ['up', 'down']
  }
})

const Vote = mongoose.model('vote', VoteSchema)
module.exports = Vote
