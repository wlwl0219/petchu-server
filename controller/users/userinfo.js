const { users } = require("../../models");

module.exports = {
  get: (req, res) => {
    const sess = req.session;

    if (sess.userid) {
      users
        .findOne({
          where: {
            id: sess.userid,
          },
        })
        .then((result) => {
          if (result) {
            return res.status(200).json(result);
          } else {
            return res.status(204).send("데이터베이스에 회원정보가 없습니다");
          }
        })
        .catch((err) => {
          return res.status(500).send(err);
        });
    } else {
      return res.status(401).send("존재하지 않은 유저입니다.");
    }
  },
};
