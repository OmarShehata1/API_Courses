const express = require("express");
const router = express.Router();
const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    console.log('FILE',file);
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const filename = `user-${Date.now()}.${ext}`; 
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
    const imageTypes = file.mimetype.split("/")[0];

  if (imageTypes === "image") {
    return cb(null, true);
  }else{
    return cb(appError.create("Only images are allowed", 400), false);
  }
}

const upload = multer({ storage: diskStorage });

const userControllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");
const appError = require("../utils/appError");




//get all users
router.route("/").get(verifyToken, userControllers.getAllUsers);

//register
router.route("/register").post(upload.single('avatar'),userControllers.register);

//login
router.route("/login").post(userControllers.login);

module.exports = router;

