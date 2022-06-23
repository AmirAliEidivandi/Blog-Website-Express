const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv").config();

// models
const User = require("../model/user.model");
const Token = require("../model/token.model");

const signUpUser = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const oldUser = await User.findOne({ username });
        if (oldUser) res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Error while siging up user" });
    }
};

const loginUser = async (req, res) => {
    const { name, username, password } = req.body;
    try {
        let oldUser = await User.findOne({ username });
        if (!oldUser) res.status(404).json({ message: "Username does not match" });

        let match = await bcrypt.compare(password, oldUser.password);

        if (match) {
            const accessToken = JWT.sign(oldUser.toJSON(), process.env.ACCESS_TOKEN);
            const refreshToken = JWT.sign(oldUser.toJSON(), process.env.REFRESH_TOKEN);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();
            res.status(200).json({ accessToken, refreshToken, name, username });
        } else {
            res.status(400).json({ message: "Password does not match" });
        }
    } catch (error) {
        res.status(500).json({ msg: "error while login the user" });
    }
};

const logOutUser = async (req, res) => {
    const token = req.body.token;
    await Token.deleteOne(token);

    res.status(204).json({ msg: "logout successfull" });
};

module.exports = {
    signUpUser,
    loginUser,
    logOutUser,
};
