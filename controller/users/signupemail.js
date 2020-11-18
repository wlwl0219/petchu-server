const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email } = req.body;
    users
      .findOne({
        where: {
          email: email,
        },
      })
      .then((result) => {
        if (data !== null) {
          res.status(201).json(result);
        } else {
          res.status(201).json(result);
        }
      })
      .catch((err) => {
        res.status(500).send("err");
      });
  },
};
