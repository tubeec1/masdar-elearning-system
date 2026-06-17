const multer = require("multer");
const path = require("path");

   
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/categories");
  },
  filename: function (req, file, cb) {
    cb(null, "category-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadCategory = multer({
  storage: categoryStorage,
});


const courseStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/courses");
  },
  filename: function (req, file, cb) {
    cb(null, "course-" + Date.now() + path.extname(file.originalname));
  },
});

const uploadCourse = multer({
  storage: courseStorage,
});

module.exports = {
  uploadCategory,
  uploadCourse,
};
