const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const db = require("./config/db");

const adminRouter = require("./routes/admin-router");
const userRouter = require("./routes/user-router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/admin", adminRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});