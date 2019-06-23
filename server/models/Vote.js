const mongoose = require('mongoose')

const { Schema } = mongoose.Schema

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

const Vote = mongoose.model('invitation', VoteSchema)
module.exports = Vote
