const mongoose = require('mongoose')

const { Schema } = mongoose

const OptionSchema = new Schema({
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'contact',
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

OptionSchema.index({ creator_id: 1 })
OptionSchema.index({ ask_id: 1 })
OptionSchema.index({ title: 1 })

const Option = mongoose.model('option', OptionSchema)
module.exports = Option
