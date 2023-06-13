const Post = require("../models/post");
module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find().populate("author", "name email picture");
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  createPost: async (req, res) => {
    try {
      const { title, description, city, country, duration, peoples, photo } =
        req.body;
      const newPost = new Post({
        title,
        description,
        city,
        country,
        duration,
        peoples,
        photo,
        author: req.userId,
      });
      const savedPost = await newPost.save();
      res.json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
