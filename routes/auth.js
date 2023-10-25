const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if(!user){
        return res.status(404).json("Username not found.");
    }

    const validatedPass = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if(!validatedPass){
        return res.status(404).json("Password not found.");
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;