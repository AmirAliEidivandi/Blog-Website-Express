const Post = require("../model/post.model");

const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        const result = await post.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!post) {
            res.status(404).json({ msg: "Post not found..." });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);

        if (!post) {
            res.status(404).json({ msg: "Post not found..." });
        }

        res.status(200).json({ msg: "post has been deleted...." });
    } catch (error) {
        res.status(500).json(error);
    }
};

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            res.status(404).json({ msg: "Post not found..." });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllPosts = async (req, res) => {
    let { username, category } = req.query;
    let posts;

    try {
        if (username) {
            posts = await Post.find({ username: username });
        } else if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    updatePost,
};
