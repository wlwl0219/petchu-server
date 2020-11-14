const { comments } = require("../../models");
//글 상세에서 댓글삭제
module.exports = {
  post: async (req, res) => {
    const { id } = req.body;
    const sess = req.session;

    if (sess.userid) {
      const commentFind = await comments.findOne({
        where: { id: id, userid: sess.userid },
      });
      if (commentFind) {
        await comments.destroy({ where: { id: id } });
        return res.status(205).send("삭제 성공");
      } else {
        return res.status(400).send("댓글을 삭제 할 수 없습니다.");
      }
    } else {
      return res.status(404).send("you are currently not logined");
    }
  },
};
