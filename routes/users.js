const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    const user = await User.findById(req.params.id);
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You can update your account only.");
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  if (req.body.id === req.params.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

// GET A USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // if (!user) {
    //   res.status(404).json("User not found.");
    // }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
