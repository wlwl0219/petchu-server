const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const sess = req.session;

    if (sess.userid) {
      req.session.destroy(err => {
        if (err) {
          res.status(500).send('err')
        } else {
          res.status(205).send('Logged out successfully')
          res.redirect('/');
        }
      });
    } else {
      res.status(404).send('you re currently not logined')
      res.redirect('/');
    }
  }
};
