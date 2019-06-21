const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  

});

const Option = mongoose.model('option', OptionSchema);
module.exports = Option;
