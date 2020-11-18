const { users } = require("../../models");

module.exports = {
  put: async (req, res) => {
    const { email, nickname, username, petinfo, socialinfo } = req.body;
    const sess = req.session;
    if (sess.userid) {
      const userEdit = await users.update(
        {
          email: email,
          username: username,
          nickname: nickname,
          petinfo: petinfo,
          socialinfo: socialinfo,
        },
        {
          where: {
            id: sess.userid,
          },
        }
      );
      if (userEdit) {
        console.log("확인확인");
        console.table(userEdit);
        console.log(userEdit.id);
        console.log("여기까지가 끝인가보오");
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
