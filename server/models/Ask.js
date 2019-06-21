const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AskSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  use_date: {
    type: Boolean,
  },
  use_time: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
  deadline_date: {
    type: Date,
    required: true
  },
  invitees: {
    type: [Schema.Types.ObjectId],
    ref: 'user'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

});

const Ask = mongoose.model('poll', AskSchema);
module.exports = Ask;
