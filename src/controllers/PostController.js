const express = require("express");
const mongoose = require("mongoose");

const Post = mongoose.model("Post");

module.exports = {
  async index(req, res) {
    try {
      const post = await Post.find().sort("-createdAt");

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);

      return res.status(400).send("Index post error");
    }
  },

  async show(req, res) {
    try {
      const post = await Post.findById(req.params.postId);

      return res.status(200).send({ post });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Post not find");
    }
  },

  async create(req, res) {
    const { author, place, description } = req.body;
    const image = req.file.location;

    const postObject = {
      author,
      place,
      description,
      image
    };

    try {
      const post = await Post.create(postObject);
      console.log("Post created...");
      req.io.emit("post", post);
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
