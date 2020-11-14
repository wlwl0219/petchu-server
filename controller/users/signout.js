const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const sess = req.session;

    if (sess.userid) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("err");
        } else {
          return res.status(205).send("Logged out successfully");
        }
      });
    } else {
      return res.status(404).send('you are currently not logined');
    }
  },
};
