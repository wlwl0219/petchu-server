const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { password, username, nickname, petinfo,
      socialinfo, userinfo, icon } = req.body;
    const sess = req.session;
    if (sess.userid) {
      users
        .update({
          password: password,
          username: username,
          nickname: nickname,
          petinfo: petinfo,
          socialinfo: socialinfo,
          userinfo: userinfo,
          icon: icon
        }, {
          where: {
            id: sess.userid
          }
        })
        .then(result => {
          if (result) {
            res.status(200).send('변경완료');
          } else {
            res.sendStatus(204); //이부분 깃북에 추가하기
          }
        })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  }
};