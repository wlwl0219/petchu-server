const { posts } = require("../../models");

module.exports = {
  get: async (req, res) => {
    const sess = req.session;
    if (sess.userid) {
      const postAllUser = await posts.findAll({
        where: { userid: sess.userid },
      });
      if (postAllUser.length < 1) {
        return res.status(204).send("작성한 게시물이 없습니다.");
      } else {
        console.log("확인!!!!!!!!!!!!!!!!!!!!");
        console.log(postAllUser);
        return res.status(200).json(postAllUser);
      }
    } else {
      return res.status(404).send("fail");
    }
  },
};
