const router = require("express").Router();
const Category = require("../models/Category.js");

// Create
router.post("/new", async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(savedCat); 
    }
})

// Get categ
router.get("/", async (req, res) => {
    try {
        const categ = await Category.find();
        res.status(200).json(categ);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;