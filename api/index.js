// import express from "express";
// import postRoutes from "./routes/posts.js"
// import authRoutes from "./routes/auth.js"
// import userRoutes from "./routes/users.js"
// const app = express();
// app.use(express.json())
// app.use("/api/posts",postRoutes)
// app.use("/api/auth",authRoutes)
// app.use("/api/users",userRoutes)

// app.listen(3002, () => {
//   console.log("Connected!");
// });

import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/client1/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  const file = req.file;
  console.log("hi")
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(3000, () => {
  console.log("Connected!");
});