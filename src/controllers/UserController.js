const express = require("express");
const mongoose = require("mongoose");

const User = mongoose.model("User");

module.exports = {
  async index(req, res) {
    const user = await User.find();

    return res.status(200).send(user);
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);

      return res.status(400).send({ error: "User not find" });
    }
  },

  async create(req, res) {
    try {
      const user = await User.create(req.body);

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);

      return res.status(400).send({ error: "Create user error" });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true
      });

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);

      return res.status(400).send({ error: "Update user error" });
    }
  },

  async destoy(req, res) {
    try {
      const user = await User.findByIdAndRemove(req.params.userId);

      return res.status(200).send("Delete success");
    } catch (error) {
      console.log(error);
      return req.status(400).send({ error: "Delete user erros" });
    }
  },

  async authenticate(req, res) {
    const user = await User.findOne({ user: req.body.user });

    try {
      if (!user) {
        return res.status("404").send({ error: "User not found" });
      }
      if (!(await user.compareHash(req.body.password))) {
        return res.status(401).send({ error: "Password incorrect" });
      } else {
        return res.status(200).send({ user, token: user.genereteToken() });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "User authenticate failed" });
    }
  }
};
