const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("Post");
const User = mongoose.model("User");

module.exports = {
  async index(req, res) {
    try {
      const post = await Post.find()
        .populate("author")
        .populate({ path: "comments.author" })
        .sort("-createdAt");

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);

      return res.status(400).send("Index post error");
    }
  },

  async show(req, res) {
    try {
      const post = await Post.findById(req.params.postId)
        .populate("author")
        .populate({ path: "comments.author" });

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Post not find");
    }
  },

  async list(req, res) {
    try {
      const post = await Post.find({ author: { _id: req.params.userId } })
        .populate("author")
        .populate({ path: "comments.author" });

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Post not find");
    }
  },

  async create(req, res) {
    const { author, place, description } = req.body;
    const image = req.file.location;

    const likes = Math.floor(Math.random() * 50);

    const postObject = {
      author,
      place,
      likes,
      description,
      image
    };

    try {
      const post = await Post.create(postObject);
      const user = await User.findById(author);
      console.log("Post created...");
      req.io.emit("post", { post, user });
      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Post created error" });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.postId, req.body);

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Post update error" });
    }
  },

  async destroy(req, res) {
    try {
      const post = await Post.findById(req.params.postId);
      await post.remove();

      return res.status(200).send("Delete success");
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Post deleted error" });
    }
  }
};
