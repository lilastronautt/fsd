const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  const post = posts[postId];
  res.render("post", { post });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
