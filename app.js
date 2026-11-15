import express from "express";

const app = express();
const port = 3000;

let posts = [];
let nextPostId = 0;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Home – show all posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New post page
app.get("/new", (req, res) => {
  res.render("new");
});

// Create post
app.post("/submit", (req, res) => {
  const post = {
    id: nextPostId++,
    date: new Date().toLocaleDateString("en-GB"),
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(post);
  res.redirect("/");
});

// Edit post page
app.get("/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).send("Post not found");

  res.render("edit", { post });
});

// Update post
app.post("/update/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find((p) => p.id === postId);

  if (!post) return res.status(404).send("Post not found");

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

// Delete post
app.get("/delete/:id", (req, res) => {
  const postId = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === postId);

  if (index === -1) return res.status(404).send("Post not found");

  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
