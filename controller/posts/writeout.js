const { posts } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let id = req.params.id;
    const sess = req.session;
    if (id) {
      const postFind = await posts.findOne({
        where: { id: id, userid: sess.userid },
      });
      if (postFind) {
        await posts.destroy({ where: { id: id, userid: sess.userid } });
        return res.status(205).send("삭제 성공");
      } else {
        return res.status(404).send("삭제할 수 없습니다."); // 게시물을 찾을 수 없거나, 작성자가 아니거나
      }
    } else {
      return res.status(401).send("fail");
    }
  },
};
