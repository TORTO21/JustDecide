const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    asks: {
    type: Schema.Types.ObjectId,
    ref: 'ask'
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
