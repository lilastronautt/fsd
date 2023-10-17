const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Load existing blog data from data.txt
let blogPosts = loadBlogData();

// Helper function to load existing blog data from data.txt
function loadBlogData() {
  try {
    const data = fs.readFileSync("data.txt", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(
      "Error loading blog data from data.txt. Starting with an empty array."
    );
    return [];
  }
}

// Helper function to save blog data to data.txt
function saveBlogData() {
  const data = JSON.stringify(blogPosts, null, 4);
  fs.writeFileSync("data.txt", data);
}

app.get("/", (req, res) => {
  res.render("index", { posts: blogPosts });
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;
  const post = blogPosts[postId];
  res.render("post", { post });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content };
  blogPosts.push(newPost);

  // Save the updated blog data to data.txt
  saveBlogData();

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
