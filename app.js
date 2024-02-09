const express = require("express");
const path = require("path");
const basicRouter = require("./public/JS/routes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// serving static files
app.use(express.static(path.join(__dirname, "public")));
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

app.use("/", basicRouter);

module.exports = app;
