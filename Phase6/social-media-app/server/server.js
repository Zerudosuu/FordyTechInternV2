import express from "express";
import { db } from "./firebase/firebase.js"; // Import Firestore instance

const app = express();
const port = 3000;

app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").get();
    const data = users.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await db.collection("users").doc(id).get();
    if (!user.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id: user.id, ...user.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.get("/users/:id/posts", async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await db
      .collection("users")
      .doc(id)
      .collection("posts")
      .get();
    const data = posts.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/users/:id/posts/:post_id", async (req, res) => {
  try {
    const id = req.params.id;
    const post_id = req.params.post_id;
    const post = await db
      .collection("users")
      .doc(id)
      .collection("posts")
      .doc(post_id)
      .get();
    if (!post.exists) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ id: post.id, ...post.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
