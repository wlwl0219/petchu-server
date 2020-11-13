const { posts } = require("../../models");

module.exports = {
  put: (req, res) => {
    // 태그를 어떻게 받아올지 고민!!!!!!!!!!!
    let id = req.params.id;
    const { title, thumbnail, content } = req.body;

    if (id) {
      const postEdit = await posts.update({
        title:title, 
        thumbnail:thumbnail, 
        content: content
      },{ where: { id: id } });

      if (postEdit) {
        return res.status(200).json(postEdit);
      } else {
        return res.status(204).send("존재하지 않은 게시물입니다.");
      }
    } else {
      return res.status(401).send("fail");
    }
  },
};
