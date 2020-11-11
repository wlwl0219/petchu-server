const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

router.post('/signin', usersController.signIn.post);
router.post('/signout', usersController.signOut.post);
router.post('/signup', usersController.signUp.post);
router.get('/userinfo', usersController.userInfo.get);
router.post('/useredit', usersController.userEdit.post);


module.exports = router;