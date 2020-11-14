const { posts } = require("../../models");

module.exports = {
  post: async (req, res) => {
    let id = req.params.id;
    if (id) {
      const postFind = await posts.findOne({ where: { id: id } });
      if (postFind) {
        await posts.destroy({ where: { id: id } });
        return res.status(205).send("삭제 성공");
      } else {
        return res.status(404).send("존재하지 않은 게시글입니다.");
      }
    } else {
      return res.status(401).send("fail");
    }
  },
};
