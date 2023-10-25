const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  categ: {
    type: Array,
    required: true,
  },
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
