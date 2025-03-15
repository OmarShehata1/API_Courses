let courses = require("../Data/Courses");
const { body, validationResult } = require("express-validator");
const Course = require("../models/course.model");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

const getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.json(course);
};

const addCourse = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newCourse = new Course(req.body);

  await newCourse.save();
  res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const updatedCourse = await Course.updateOne(
      { _id: courseId },
      { $set: req.body }
    );
    return res.status(200).json(updatedCourse);
  } catch (err) {
    return res.status(404).json({ message: "Course not found, Error: ", err });
  }
};

const deleteCourse = async(req, res) => {
  await Course.deleteOne({ _id: req.params.id });
  res.json({sucess : true, message: "Course deleted successfully"});
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
