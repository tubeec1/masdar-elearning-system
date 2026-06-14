<<<<<<< HEAD
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/categories"); 
  },

=======

const multer = require("multer");
const path = require("path");

// ================= CATEGORY =================
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/categories");
  },
>>>>>>> muna
  filename: function (req, file, cb) {
    cb(
      null,
      "category-" + Date.now() + path.extname(file.originalname)
    );
  },
});

<<<<<<< HEAD
const upload = multer({ storage });

module.exports = upload;
=======
const uploadCategory = multer({ storage: categoryStorage });

// ================= COURSE =================
const courseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/courses");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "course-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const uploadCourse = multer({ storage: courseStorage });

module.exports = {
  uploadCategory,
  uploadCourse,
};
>>>>>>> muna
