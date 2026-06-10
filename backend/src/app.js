const express = require("express");
const cors = require("cors");
let authRout = require("./routes/authRout");
const errorHandler = require("./middleWare/GlobalErrorHandleMiddleWare");
const path = require("path");

const app = express();
// Static files
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRout);

app.use(errorHandler);
module.exports = app;
