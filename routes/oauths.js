const express = require("express");
const router = express.Router();

const { oauthsController } = require("../controller");

router.get("/github", oauthsController.github.get);
router.get("/google", oauthsController.google.get);
router.get("/naver", oauthsController.naver.get);
router.get("/kakao", oauthsController.kakao.get);

module.exports = router;
