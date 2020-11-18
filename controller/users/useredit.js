const { users } = require("../../models");

module.exports = {
  put: async (req, res) => {
    const { email, nickname, petinfo, socialinfo } = req.body;
    console.log(req.body);
    const sess = req.session;
    if (sess.userid) {
      const userEdit = await users.update(
        {
          nickname: nickname,
          petinfo: petinfo,
          socialinfo: socialinfo,
        },
        {
          where: {
            email: email,
          },
        }
      );
      if (userEdit) {
        res.status(200).json(userEdit);
      } else {
        return res
          .status(204)
          .send("데이터베이스에 회원정보를 업데이트 하지 못했습니다.");
      }
    } else {
      return res.status(401).send("존재하지 않은 유저입니다.");
    }
  },
};
