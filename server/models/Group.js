const mongoose = require('mongoose')

const { Schema } = mongoose

const GroupSchema = new Schema({
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'user'
  }
})

GroupSchema.index({ owner_id: 1 })
GroupSchema.index({ name: 1 })

const Group = mongoose.model('group', GroupSchema)
module.exports = Group
