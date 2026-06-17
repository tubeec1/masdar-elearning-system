const express = require("express");
const cors = require("cors");

const authRout = require("./routes/authRout");
const categoryRout = require("./routes/categoryRoute");
const courseRoute = require("./routes/courseRoute");
const errorHandler = require("./middleWare/GlobalErrorHandleMiddleWare");

const userRoute = require("./routes/userRoute")
const moduleRoutes = require("./routes/moduleRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
 (Work in progress)

const path = require("path");

const app = express();


app.use("/public", express.static(path.join(__dirname, "../public")));

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRout);
app.use("/api/categories", categoryRout);
app.use("/api/courses", courseRoute);

app.use("/api/users", userRoute);
app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);

  (Work in progress)

app.use(errorHandler);



module.exports = app;
