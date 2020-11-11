const express = require('express');
const router = express.Router();

const { postsController } = require('../controller');
const { commentsController } = require('../controller');

router.post('/writeout', postsController.writeOut.post);
router.post('/writeup', postsController.writeUp.post);
router.get('/writeinfo', postsController.writeInfo.get);
router.post('/writeedit', postsController.writeEdit.post);

router.post('/commentout', commentsController.commentOut.post);
router.post('/commentup', commentsController.commentUp.post);
router.get('/commentinfo', commentsController.commentInfo.get);
router.post('/commentedit', commentsController.commentEdit.post);

module.exports = router;