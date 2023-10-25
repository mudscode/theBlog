const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const multer = require("multer");

// Routes
const authRouter = require("./routes/auth.js");
const usersRouter = require("./routes/users.js");
const postRouter = require("./routes/posts.js");
const CatRouter = require("./routes/categories.js");
// const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected with MongoDB successfully.");
  })
  .catch((error) => {
    console.log(`An error occurred while connecting with MongoDB: ${error}`);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File uploaded successfully.");
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
app.use("/api/categ", CatRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
