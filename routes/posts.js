const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create a post
router.post("/new", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Updating a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.authorName === req.body.authorName) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can update your post only.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Deleting a post
// router.delete("/:id", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if(post){
//             try{
//                 const deletedPost = await Post.delete(post);
//                 res.status(200).json(this.deletedPost);
//             } catch (error) {
//                 res.status(500).json(error);
//             }
//         } else {
//             res.status(404).json("Post not found.");
//         }
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found");
    }
    if (post.authorName === req.body.authorName) {
      try {
        const deletedPost = await Post.deleteOne(post);
        res.status(200).json(deletedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You can delete your post only.");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json("Post not found.");
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  const authorName = req.query.authorName;
  const cat = req.query.cat;
  try {
    let posts;
    if (authorName) {
      posts = await Post.find({ authorName });
    } else if (cat) {
      posts = await Post.find({
        categ: {
          $in: [cat]
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;