const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("Post");
const User = mongoose.model("User");

module.exports = {
  async show(req, res) {
    try {
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Created comment error" });
    }
  },
  async create(req, res) {
    try {
      const { comment } = req.body;
      const { postId, userId } = req.params;

      const post = await Post.findByIdAndUpdate(postId, {
        $push: { comments: { author: userId, comentario: comment } }
      });

      const username = await User.findById(userId);

      req.io.emit("comentario", { comment, author: username.user });

      req.io.on("comentario", () => {
        console.log("new comentario");
      });
      console.log("Novo comentario");
      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Created comment error" });
    }
  }
};
