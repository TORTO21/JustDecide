const mongoose = require('mongoose')

const { Schema } = mongoose

const MonikerSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Moniker = mongoose.model('moniker', MonikerSchema)
module.exports = Moniker
