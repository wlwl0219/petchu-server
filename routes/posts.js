const express = require("express");
const router = express.Router();

const { postsController } = require("../controller");
const { commentsController } = require("../controller");

router.post("/writeup", postsController.writeUp.post);
router.get("/writeinfo/:id", postsController.writeInfo.get);
router.post("/writeout/:id", postsController.writeOut.post);
router.put("/writeedit/:id", postsController.writeEdit.put);
router.get("/writelist", postsController.writeList.get);

router.post('/commentout/:id', commentsController.commentOut.post);
router.post('/commentup/:id', commentsController.commentUp.post);
router.put('/commentedit/:id', commentsController.commentEdit.put);

router.get("/writeall", postsController.writeAll.get);
module.exports = router;
