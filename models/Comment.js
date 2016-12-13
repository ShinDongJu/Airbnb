var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var schema = new Schema({
  post: {type: Schema.Types.ObjectId, required: true, trim: true},
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  checkin: {type:String, required: true, trim: true},
  checkout: {type:String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
});

var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
