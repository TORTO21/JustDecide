const mongoose = require('mongoose')

const { Schema } = mongoose

const InvitationSchema = new Schema({
  ask_id: {
    type: Schema.Types.ObjectId,
    ref: 'ask',
    required: true
  },
  contact_id: {
    type: Schema.Types.ObjectId,
    ref: 'contact',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'active', 'rejected']
  },
  invite_url: {
    type: String
  }
})

InvitationSchema.index({ ask_id: 1 })
InvitationSchema.index({ user_id: 1 })

const Invitation = mongoose.model('invitation', InvitationSchema)
module.exports = Invitation
