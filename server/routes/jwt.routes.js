const router = require("express").Router();
const { createNewToken } = require("../controller/jwt.controller");

router.post("/", createNewToken);

module.exports = router;
