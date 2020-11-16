const { posts } = require("../../models");
const { tags } = require("../../models");
const { post_tags } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const sess = req.session;
    const { title, thumbnail, content, tagname } = req.body;
    // 세션이 잘 살아있는지
    if (sess.userid) {
      // posts 테이블을 db에 새로 저장
      const postWrite = await posts.create({
        title: title,
        thumbnail: thumbnail,
        content: content,
        userid: sess.userid,
      });
      // 우선 태그네임을 찾는다.
      const tagsFind = await tags.findAll({ where: { tagname: tagname } });
      if (!tagsFind) {
        //  태그가 없다면 tags 테이블과 post_tags테이블을 db에 새로 저장한다
        const tagCreate = await tags.create({ tagname: tagname });
        await post_tags.create({
          postid: postWrite.id,
          tagid: tagCreate.id,
        });
      } else {
        // 태그가 이미 있으면 post_tags테이블을 db에 새로 저장한다
        await post_tags.create({
          postid: postWrite.id,
          tagid: tagsFind.id,
        });
      }
      // 여기부터 고민고민
      if (postWrite) {
        return res.status(201).json(postWrite);
      } else {
        return res.status(409).send("fail");
      }

      // 세션이 없으면 작성 불가
    } else {
      return res.status(401).send("존재하지 않은 유저입니다.");
    }
  },
};
