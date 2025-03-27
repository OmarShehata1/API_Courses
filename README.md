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
### Courses Endpoint

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | `/courses`     | Get all courses  |
| GET    | `/courses/:id` | Get course by ID |
| POST   | `/courses`     | Add new course   |
| PATCH  | `/courses/:id` | Update course    |
| DELETE | `/courses/:id` | Delete course    |


### User Endpoint

| Method | Endpoint        | Description         |
| ------ | ----------------| --------------------|
| GET    | `/users`        | Get all users       |
| POST   | `//users/login` | Login user          |
| POST  | `/users/register`| Register a new user |



