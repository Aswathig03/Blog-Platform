const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String }, // Path to the uploaded image
  createdAt: { type: Date, default: Date.now },
  email: {
    type: String,
    required: true, // Make it required if every post must have an associated email
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

