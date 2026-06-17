const express = require("express");
const router = express.Router();
const lessonController = require("../controrolles/lessonController");
let authMiddleware = require("../middleWare/authMiddleWare");
let authorize = require("../middleWare/checkRole");




router.post("/create",authMiddleware,authorize("admin", "teacher"), lessonController.createLesson);
router.get("/read", lessonController.getAllLessons);
router.get("/module/:moduleId", lessonController.getLessonsByModule);
router.get("/read/:id", lessonController.getLessonById);
router.put("/update/:id", authMiddleware,authorize("admin", "teacher"),lessonController.updateLesson);
router.delete("/delete/:id", authMiddleware,authorize("admin", "teacher"),lessonController.deleteLesson);

module.exports = router;