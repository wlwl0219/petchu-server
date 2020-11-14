const express = require('express');
const router = express.Router();

const { postsController } = require('../controller');
const { commentsController } = require('../controller');

router.post('/writeout', postsController.writeOut.post);
router.post('/writeup', postsController.writeUp.post);
router.get('/writeinfo', postsController.writeInfo.get);
router.post('/writeedit', postsController.writeEdit.post);

router.post('/commentout/:id', commentsController.commentOut.post);
router.post('/commentup/:id', commentsController.commentUp.post);
router.put('/commentedit/:id', commentsController.commentEdit.put);

module.exports = router;