const { posts } = require("../../models");

module.exports = {
  post: async (req, res) => {
    // 태그를 어떻게 받아올지 고민!!!!!!!!!!!
    const sess = req.session;
    const { title, thumbnail, content } = req.body;
    const postWrite = await posts.create({
      title: title,
      thumbnail: thumbnail,
      content: content,
      userid: sess.userid,
    });

    if (result) {
      return res.status(201).json(postWrite);
    } else {
      return res.status(409).send("fail");
    }
  },
};
