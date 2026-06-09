const express = require("express");
const cors = require("cors");
let testRout = require ("./routes/testR.js")
const app = express();
app.use(cors());
app.use(express.json());
app.use("/" ,testRout)
module.exports = app;





