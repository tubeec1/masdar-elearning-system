const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/categories"); 
  },

  filename: function (req, file, cb) {
    cb(
      null,
      "category-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;