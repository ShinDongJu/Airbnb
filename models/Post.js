var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  name: {type:String, required: true, trin: true},
  title: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  city: {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  payment: {type: String, required: true, trim: true},
  convenient: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  password: {type: String},
  read: {type: Number, default:0},
  numComment: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}

}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;

