const { comments } = require("../../models");
//댓글작성
module.exports = {
  post: async (req, res) => {
    const { content } = req.body;
    const sess = req.session;
    let id = req.params.id;

    if (sess.userid) {
      const commentCreated = await comments.create({
        content: content,
        postid: id,
        userid: sess.userid,
      });
      if (commentCreated) {
        return res.status(200).json(commentCreated);
      } else {
        return res.status(400).send("fail");
      }
    } else {
      return res.status(404).send("you are currently not logined");
    }
  },
};
