const express = require("express");
const { getAllPosts, createPost } = require("../controller/postsController");
const authMiddleware = require("../middlewares/authorMiddleware");

const router = express.Router();

router.get("/get-posts", getAllPosts);
router.post("/create-post", authMiddleware, createPost);

module.exports = router;
