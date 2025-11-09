const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 500,
      default: ""
    },

    media: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" }
    },

    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ],

    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true, maxlength: 300 },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

// Improve query performance for feeds and likes
postSchema.index({ createdAt: -1 });
postSchema.index({ user: 1 });

module.exports = mongoose.model("Post", postSchema);
