const mongoose = require('mongoose')

const { Schema } = mongoose.Schema

const OptionSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  ask_id: {
    type: Schema.Types.ObjectId,
    ref: 'ask',
    required: true
  },
  title: {
    type: String
  },
  votes: {
    type: [Schema.Types.ObjectId],
    ref: 'vote'
  }
})

const Option = mongoose.model('invitation', OptionSchema)
module.exports = Option
