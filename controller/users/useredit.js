const { users } = require("../../models");

module.exports = {
  put: (req, res) => {
    const {
      password,
      username,
      nickname,
      petinfo,
      socialinfo,
      userinfo,
      icon,
    } = req.body;
    const sess = req.session;
    if (sess.userid) {
      users
        .update(
          {
            password: password,
            username: username,
            nickname: nickname,
            petinfo: petinfo,
            socialinfo: socialinfo,
            userinfo: userinfo,
            icon: icon,
          },
          {
            where: {
              id: sess.userid,
            },
          }
        )
        .then((result) => {
          if (result) {
            res.status(200).json(result);
          } else {
            res
              .status(204)
              .send("데이터베이스에 회원정보를 업데이트 하지 못했습니다.");
          }
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    } else {
      res.status(401).send("존재하지 않은 유저입니다.");
    }
  },
};
