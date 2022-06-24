const router = require("express").Router();
const { uploadImage, getImage } = require("../controller/image.controller");
const upload = require("../utils/upload");

router.post("/upload", upload.single("file"), uploadImage);
router.get("/:filename", getImage);

module.exports = router;
