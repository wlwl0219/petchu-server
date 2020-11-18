require("dotenv").config();
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const axios = require("axios");
const { users } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const sess = req.session;
    const { code } = req.query;
    console.info("==== session ====requestCode====");
    console.log(sess);
    console.log(code);

    const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`;
    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
    console.log(`response.data:${response.data}`);
    console.info("==== 확인확인 ====");

    let token = response.data.split("&")[0].split("=")[1];

    const userResponse = await axios({
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log("유저정보!!!!!!!:", userResponse.data);
    users
      .findOrCreate({
        where: { id: userResponse.data.id },
        defaults: {
          email: userResponse.data.email,
          password: userResponse.data.node_id,
          username: userResponse.data.name,
          nickname: userResponse.data.login,
        },
      })
      .then(([result]) => {
        if (result) {
          sess.userid = result.dataValues.id;
          res.redirect("http://localhost:3000/");
        } else {
          res.status(404).send("fail");
        }
      });
  },
};
