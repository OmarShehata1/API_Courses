const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const coursesController = require("../controllers/courses.controllers");
const { validationSchema } = require("../middleware/validationSchema");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const allowedTO = require("../middleware/allowedTO");
router
  .route("/")
  .get(coursesController.getAllCourses)
  .post(verifyToken,allowedTO(userRoles.MANGER) ,validationSchema(), coursesController.addCourse);

router
  .route("/:id")
  .get(coursesController.getCourse)
  .patch(verifyToken, coursesController.updateCourse)
  .delete(verifyToken,allowedTO(userRoles.ADMIN, userRoles.MANGER), coursesController.deleteCourse);

module.exports = router;
