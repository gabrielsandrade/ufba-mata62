const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const client = redis.createClient();
const port = 3000;
const app = express();

// app.use(
//   session({
//     secret: "secret-key",
//     store: new redisStore({
//       host: "localhost",
//       port: 6379,
//       client: client,
//       ttl: 260,
//     }),
//     saveUninitialized: false,
//     resave: false,
//   })
// );

app.use(
  session({
    secret: "screte-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: 'http://localhost:8080'}));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
