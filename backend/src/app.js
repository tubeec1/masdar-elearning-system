const express = require("express");
const cors = require("cors");
let authRout = require("./routes/authRout");
let categoryRout = require("./routes/categoryRoute")
const errorHandler = require("./middleWare/GlobalErrorHandleMiddleWare");
const courseRoute = require("./routes/courseRoute");
const path = require("path");

const app = express();
// Static files
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRout);
<<<<<<< HEAD
app.use("/api/categories" ,categoryRout)
=======
app.use("/api/categories" ,categoryRout);
app.use("/api/courses", courseRoute);
>>>>>>> muna

app.use(errorHandler);
module.exports = app;
