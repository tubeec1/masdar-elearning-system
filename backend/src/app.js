const express = require("express");
const cors = require("cors");

const authRout = require("./routes/authRout");
const categoryRout = require("./routes/categoryRoute");
const courseRoute = require("./routes/courseRoute");
const errorHandler = require("./middleWare/GlobalErrorHandleMiddleWare");
const userRoute = require("./routes/userRoute");

const path = require("path");

const app = express();

// Static files
app.use("/public", express.static(path.join(__dirname, "../public")));

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRout);
app.use("/api/categories", categoryRout);
app.use("/api/courses", courseRoute);
app.use("/api/users", userRoute);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
