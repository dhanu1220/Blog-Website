// export const addPost  = (req,res)=>{
//     res.json("from controller")
// }

import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const postId = req.params.id; // Assuming `id` is passed as a route parameter
const q = "SELECT * FROM posts p JOIN users u ON p.uid = u.id WHERE p.id = ?";


db.query(q, [postId], (err, data) => {
  if (err) {
    console.error("Error fetching post:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  if (data.length === 0) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.status(200).json(data[0]);
});

};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const postId = req.params.id;
  const query = "DELETE FROM posts WHERE `id` = ?";

  db.query(query, [postId], (err, data) => {
    if (err) return res.status(500).json(err);

    // Check if any rows were affected
    if (data.affectedRows === 0) {
      return res.status(404).json("Post not found.");
    }

    return res.json("Post has been deleted!");
  });
};



// Update post controller
export const updatePost = (req, res) => {
  const postId = req.params.id;
  const { title, desc } = req.body;

  const query =
    'UPDATE posts SET `title`=?, `desc`=? WHERE `id`=?';

  const values = [title, desc, postId];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json('Post has been updated.');
  });
};