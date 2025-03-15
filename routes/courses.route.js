const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const coursesController = require("../controllers/controllers");
const { validationSchema } = require("../middleware/validationSchema");

router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(validationSchema(), coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
