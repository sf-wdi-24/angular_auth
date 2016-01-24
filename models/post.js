var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var postSchema = new Schema({
  title: { type: String },
  content: { type: String }
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;