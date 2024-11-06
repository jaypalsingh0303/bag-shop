const express = require("express");
const app = express();

// const db = require("./config/db");
const adminRoutes = require("./routes/admin-route");
const userRoutes = require("./routes/user-route");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.listen(3000);
