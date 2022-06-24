const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// components
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth.routes");
const jwtRouter = require("./routes/jwt.routes");
const postsRouter = require("./routes/post.routes");
const commentsRouter = require("./routes/comment.routes");
const imageRouter = require("./routes/image.routes");

// middlewares
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/token", jwtRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/file", imageRouter);

const PORT = process.env.PORT || 8000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is running successfully on port ${PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

start();
