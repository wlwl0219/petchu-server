const { posts } = require("../../models");

module.exports = {
  post: (req, res) => {
    let id = req.params.id;
    if(id){
      await posts.destroy({where: {id:id}})
      return res.status(205).send("삭제 성공");
    } else {
      return res.status(401).send("fail");
    }
  },
};
