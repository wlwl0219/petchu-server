const express = require("express");
require("dotenv").config();

//라우터 추가
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const oauthsRouter = require("./routes/oauths");

// 버전 일때만 활성화
const mySqlStore = require("express-mysql-session")(session);
const options = {
  user: "petchu",
  password: "petchu123",
  database: "petchu_db",
  host: "database-petchu.ctuzxrmfidqa.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
  port: 3306,
};
const conn = mysql.createConnection(options);
conn.connect();

//미들웨어 추가
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

//서버 추가
const app = express();
const port = 8001;

//미들웨어 실행
/*
 * cors() - CORS를 대응하기 위한 라이브러리 ( Access-Control-Allow-Origin: * )
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
app.use(
  cors({
    origin: ["http://petchuclient.s3-website.ap-northeast-2.amazonaws.com"],
    methods: ["GET", "POST", "OPTION", "PUT", "DELETE"],
    credentials: true,
  })
);

/*
 * session(option)
 * secret - session hijacking을 막기위해 hash값에 추가로 들어가는 값 (Salt와 비슷한 개념)
 * resave - session을 언제나 저장할지 정하는 값
 * saveUninitialize: true - 세션이 저장되기 전에 uninitialized 상태로 만들어 저장
 */
// app.use(
//   session({
//     // secret: process.env.SESSION_SECRET,
//     secret: "@codestates",
//     resave: true, //false
//     saveUninitialized: true, //false
//   })
// );

// 버전 일때만 활성화
app.use(
  session({
    secret: "codestates",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
      sameSite: "none",
    },
    store: new mySqlStore(options),
  })
);

/*
 * cookieParser() - 넘어온 Cookie 데이터를 관리하기 쉽게 JSON 객체로 변환해 주는 라이브러리
 */
app.use(cookieParser());

/*
 * POSTMAN을 통한 test에 필요할지도 모릅니다. logging을 활용하세요.
 */
app.use(morgan("dev"));

/*
 * express.json() - body로 넘어온 데이터를 JSON 객체로 변환
 */
app.use(express.json());

/*
 * express.urlencoded({ extended }) - 중첩 객체를 허용할지 말지를 결정하는 옵션
 * 참고 링크(https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0/45690436#45690436)
 */
app.use(express.urlencoded({ extended: false }));

//클라이언트랑 연결
app.use(express.static(__dirname + "/public"));
// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.use("/user", usersRouter);
app.use("/post", postsRouter);
app.use("/oauth", oauthsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
