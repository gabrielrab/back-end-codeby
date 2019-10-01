const express = require("express");
const multer = require("multer");
const multerConfigs = require("./configs/multer");
const routes = express.Router();

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

//App
routes.get("/", (req, res) => {
  return res
    .status(200)
    .send(`API para Codeby - Versão: ${process.env.VERSION}`);
});

//Post routes
routes.get("/post", PostController.index);
routes.get("/post/:postId", PostController.show);
routes.post(
  "/post",
  multer(multerConfigs).single("img"),
  PostController.create
);
routes.put("/post/:postId", PostController.update);
routes.delete("/post/:postId", PostController.destroy);

//Like
routes.post("/post/:id/like", LikeController.store);

module.exports = routes;
