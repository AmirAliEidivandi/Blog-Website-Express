const router = require("express").Router();
const { authenticatedToken } = require("../controller/jwt.controller");
const { getComments, deleteComment, newComment } = require("../controller/comment.controller");

router.get("/", authenticatedToken, getComments);
router.post("/new", authenticatedToken, newComment);
router.delete("/:id", authenticatedToken, deleteComment);

module.exports = router;
