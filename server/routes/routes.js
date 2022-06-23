const router = require('express').Router();

router.get("/", (req, res) => res.send("hello router"));

module.exports = router;
