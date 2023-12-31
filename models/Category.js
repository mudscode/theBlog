const mongoose = require("mongoose");

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Category = mongoose.model("Category", catSchema);

module.exports = Category;