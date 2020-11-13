const { users } = require("../../models");

module.exports = {
  get: (req, res) => {
    const sess = req.session;

    if (sess.userid) {
      users
        .findOne({
          where: {
            id: sess.userid
          }
        })
        .then(result => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.sendStatus(204); //이부분 깃북에 추가하기
          }
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
      res.status(401).send('존재하지 않은 유저입니다.')//깃북에 수정
    }
  }
};