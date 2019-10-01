const mongoose = require("mongoose");
const { promisify } = require("util");

const PostSchema = mongoose.Schema(
  {
    author: { type: String, require: true },
    place: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    likes: { type: Number, require: true, default: 0 }
  },
  { timestamps: true }
);

mongoose.model("Post", PostSchema);
