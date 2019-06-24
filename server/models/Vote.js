const mongoose = require('mongoose')

const { Schema } = mongoose

const VoteSchema = new Schema({
  option_id: {
    type: Schema.Types.ObjectId,
    ref: 'option',
    required: true
  },
  contact_id: {
    type: Schema.Types.ObjectId,
    ref: 'contact',
    required: true
  },
  direction: {
    type: String,
    enum: ['up', 'down']
  }
})

const Vote = mongoose.model('vote', VoteSchema)
module.exports = Vote
