const express = require("express");
const multer = require("multer");
const multerConfigs = require("./configs/multer");
const routes = express.Router();

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");
const UserController = require("./controllers/UserController");
const CommentController = require("./controllers/CommentController");

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

//User routes
routes.get("/user", UserController.index);
routes.get("/user/:userId", UserController.show);
routes.post("/user", UserController.create);
routes.put("/user/:userId", UserController.update);
routes.delete("/user/:userId", UserController.destoy);
//Autenticação
routes.post("/login", UserController.authenticate);

//Comments
routes.post("/comment/:postId/:userId", CommentController.create);

module.exports = routes;
