const { posts } = require("../../models");
module.exports = {
  get: async (req, res) => {
    const postAll = await posts.findAll();
    return res.status(200).json(postAll);
  },
};