const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone_hash: {
    type: String,
    required: true
  },
  asks: {
    type: Schema.Types.ObjectId,
    ref: 'ask'
  }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
