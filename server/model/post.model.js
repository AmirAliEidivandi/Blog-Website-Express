const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            uinque: true,
        },
        description: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
        categories: {
            type: [String],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema)