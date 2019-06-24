const mongoose = require('mongoose')

const { Schema } = mongoose

const ContactSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact
