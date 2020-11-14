const express = require("express");
const router = express.Router();

const { postsController } = require("../controller");
const { commentsController } = require("../controller");

router.post("/writeup", postsController.writeUp.post);
router.get("/writeinfo/:id", postsController.writeInfo.get);
router.post("/writeout/:id", postsController.writeOut.post);
router.put("/writeedit/:id", postsController.writeEdit.put);
router.get("/writelist", postsController.writeList.get);

router.post("/commentout", commentsController.commentOut.post);
router.post("/commentup", commentsController.commentUp.post);
router.get("/commentinfo", commentsController.commentInfo.get);
router.post("/commentedit", commentsController.commentEdit.post);

module.exports = router;
