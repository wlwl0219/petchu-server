const { users } = require("../../models");

module.exports = {
  put: async (req, res) => {
    const { email, nickname, petinfo, socialinfo, password } = req.body;
    console.log(req.body);

    const userCheck = await users.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (userCheck === null) {
      return res.status(404).send("비밀번호가 올바르지 않습니다");
    } else {
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
          .status(404)
          .send("데이터베이스에 회원정보를 업데이트 하지 못했습니다.");
      }
    }
  },
};
