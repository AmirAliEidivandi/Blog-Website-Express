const Comment = require("../model/comment.model");

const newComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        const result = await comment.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteComment = async (req, res) => {
    try {
        await Comment.findById(req.params.id);
        res.status(200).json({ msg: "Comment has been deleted...." });
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    newComment,
    getComments,
    deleteComment,
};
