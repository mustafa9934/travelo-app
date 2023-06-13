const express = require("express");
const router = express.Router();
const userRoutes = require("./user");
const postsRoutes = require("./post");

router.use("/user", userRoutes);
router.use("/posts", postsRoutes);

module.exports = router;
