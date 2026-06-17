const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published"
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
