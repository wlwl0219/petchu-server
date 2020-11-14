const { comments } = require("../../models");
//댓글내용 수정
module.exports = {
  put: async (req, res) => {
    const { content, id } = req.body;
    const sess = req.session;

    if (sess.userid) {
      const commentFind = await comments.findOne({
        where: { id: id, userid: sess.userid },
      });
      if (commentFind) {
        const commentEdit = await comments.update(
          { content: content },
          { where: { id: id, userid: sess.userid } }
        );
        return res.status(200).json(commentEdit);
      } else {
        return res.status(400).send("댓글을 수정할 수 없습니다.");
      }
    } else {
      return res.status(404).send("you are currently not logined");
    }
  },
};
