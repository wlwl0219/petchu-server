const { users } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password, username, nickname } = req.body;
    users
      .findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: password,
          username: username,
          nickname: nickname
        }
      })
      .then(([user, created]) => {
        if (!created) {
          return res.status(409).send("email exists");
        } else {
          return res.status(200).send('success signup');
        }
      }).catch(err => {
        res.status(500).send(err);
      });
  }
};



// if (!created) {
//   return res.status(409).send('email exists');
// }
// const data = await user.get({ plain: true });
// //get메서드 plain:true 옵션과 함께 실행하면, 해당 인스턴스의 데이터만 반환
// res.status(200).json(data);
// //res.status(200).send('success signup');