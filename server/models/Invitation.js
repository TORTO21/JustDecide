const mongoose = require('mongoose')

const { Schema } = mongoose

const InvitationSchema = new Schema({
  ask_id: {
    type: Schema.Types.ObjectId,
    ref: 'ask',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
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

const Invitation = mongoose.model('invitation', InvitationSchema)
module.exports = Invitation
