const router = require("express").Router();
const { getAllPosts, getPost, createPost, deletePost, updatePost } = require("../controller/post.controller");
const { authenticatedToken } = require("../controller/jwt.controller");

router.post("/", authenticatedToken, createPost);
router.put("/:id", authenticatedToken, updatePost);
router.delete("/:id", authenticatedToken, deletePost);

router.get("/", authenticatedToken, getAllPosts);
router.get("/:id", authenticatedToken, getPost);

module.exports = router;