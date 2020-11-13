require("dotenv").config();
const axios = require("axios");
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const { users } = require("../../models");

module.exports = {
  get: async (req, res) => {
    // 깃헙이 전달해준 code를 받음
    const { code } = req.body;
    // 다시 깃헙에게 아이디, 비번, code를 담아 post로 보낸다.
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code,
        clientID,
        clientSecret,
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    // 토큰으로 유저정보 가지고 오기
    const token = response.data.access_token;
    const { data } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    // 그 유저 정보로 디비에 저장
    const sess = req.session;
    users
      .findOrCreate({
        where: {
          email: data.email,
        },
        defaults: {
          username: data.name,
          nickname: data.login,
        },
      })
      .then(([user, created]) => {
        // 깃헙 이메일로 이미 회원가입을 했을때
        if (!created) {
          return res
            .status(409)
            .send("너 소셜로 오지말고 일반으로 로그인해 임마");
          // 깃헙 이메일로 회원가입을 새로 하는중
        } else {
          sess.userid = created.id;
          return res.status(201).json({
            id: created.id,
            token: token,
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
