# **API_Courses** 📚🚀

A **RESTful API** for managing courses, built using **Node.js** and **MongoDB**.

## 🔹 **Features**

✅ **CRUD Operations**: Create, Read, Update, and Delete courses.  
✅ **MongoDB Integration**: Stores course data efficiently.  
✅ **Express.js Framework**: Lightweight and fast API handling.  
✅ **Error Handling**: Ensures smooth API responses.  
✅ **Authentication (Optional)**: Secure endpoints using JWT (if implemented).

## 🔹 **Tech Stack**

- **Node.js** – Backend runtime.
- **Express.js** – API framework.
- **MongoDB** – Database for storing courses.
- **Mongoose** – ODM for MongoDB interaction.
- **Postman** – API testing.


 Test endpoints using Postman or browser.

## 🔹 **API Endpoints**

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | `/courses`     | Get all courses  |
| GET    | `/courses/:id` | Get course by ID |
| POST   | `/courses`     | Add new course   |
| PATCH  | `/courses/:id` | Update course    |
| DELETE | `/courses/:id` | Delete course    |

## 🔹 **Contributing**

Feel free to submit **issues** or **pull requests** to improve the API! 🎯
// API Endpoints
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET course by ID
router.get('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add new course
router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update course
router.patch('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndRemove(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;