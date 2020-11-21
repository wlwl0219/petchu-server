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
          return res.status(404).send("invalid user");
        } else {
          sess.userid = result.dataValues.id;
          console.info("==== 세션주는중 ====");
          console.log(sess);
          console.log(sess.userid);
          return res.status(200).json(result);
          // return res.status(200).json({
          //   id: result.id,
          // });
        }
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
};
