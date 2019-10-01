const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    place: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true
        },
        comentario: { type: String, require: true }
      }
    ],
    likes: { type: Number, require: true, default: 0 }
  },
  { timestamps: true }
);

mongoose.model("Post", PostSchema);
