let courses = require("../Data/Courses");
const { body, validationResult } = require("express-validator");

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getCourse = (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found");
  res.json(course);
};

const addCourse = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
      price: req.body.price,
    };
    console.log(course);
    courses.push(course);
    res.status(201).json(course);
  }
};

const updateCourse = (req, res) => {
  const courseId = +req.params.id;
  let course = courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  course = { ...course, ...req.body };
  courses[courseId - 1] = course;
  res.json(courses);
};

const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  const course = courses.find((c) => c.id === courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.json(courses);
};

module.exports = {
  getAllCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
