const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    const sess = req.session;
    users
      .findOne({
        where: {
          email: email,
          password: password,
        },
      })
      .then((result) => {
        if (result === null) {
          res.status(404).send('invalid user');
        } else {
          sess.userid = result.id;
          res.status(200).json(result);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

//소셜추가 깃헙 구글 먼저 네이버 카카오
