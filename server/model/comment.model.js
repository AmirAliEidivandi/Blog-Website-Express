const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Comment", commentSchema);
