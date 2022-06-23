const JWT = require("jsonwebtoken");
require("dotenv").config();
const Token = require("../model/token.model");

const authenticatedToken = async (req, res, next) => {
    const authHeader = req.headers["autherization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) {
        return res.status(401).json({ msg: "token is missing" });
    }

    JWT.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: "invalid token" });
        }
    });
    req.user = user;
    next();
};

const createNewToken = async (req, res) => {
    const refreshToken = req.body.token.split(" ")[1];

    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh token is missing" });
    }

    const token = await Token.findOne({ token: refreshToken });
    if (!token) {
        return res.status(404).json({ msg: "Refresh token is not valid" });
    }

    JWT.verify(token.token, process.env.REFRESH_TOKEN, (err, user) => {
        if (err) {
            res.status(500).json({ msg: "invalid refresh token" });
        }

        const accessToken = JWT.sign(user, process.env.ACCESS_TOKEN);
        return res.status(200).json({ accessToken });
    });
};

module.exports = {
    authenticatedToken,
    createNewToken,
};
