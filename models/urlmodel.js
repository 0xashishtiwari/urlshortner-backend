const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  }
});

const UrlModel = mongoose.model('UrlModel', urlSchema);
module.exports = UrlModel;
