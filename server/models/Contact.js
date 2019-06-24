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

ContactSchema.index({ owner_id: 1 })
ContactSchema.index({ user_id: 1 })
ContactSchema.index({ name: 1 })

const Contact = mongoose.model('contact', ContactSchema)
module.exports = Contact
