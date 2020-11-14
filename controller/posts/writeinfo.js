const { posts } = require("../../models");
const { comments } = require("../../models");

module.exports = {
  get: async (req, res) => {
    let id = req.params.id;
    if (id) {
      const postOne = await posts.findOne({ where: { id: id } });
      const commentsAll = await comments.findAll({ where: { postid: id } });
      if (postOne) {
        return res.status(200).json([postOne, { comData: commentsAll }]);
      } else {
        return res.status(404).send("존재하지 않은 게시물입니다.");
      }
    } else {
      return res.status(401).send("fail");
    }
  },
};
