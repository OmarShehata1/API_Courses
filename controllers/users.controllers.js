const User = require("../models/user.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");
const generateJWT = require("../utils/generateJWT");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncWrapper(async (req, res) => {
  console.log(req.headers);
  const query = req.query;

  const limit = query.limit || 20;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users: users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password,role } = req.body;

  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = AppError.create(
      "User already exists",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename,
  });

  // generate token
    const token =await generateJWT({ email: newUser.email ,id: newUser._id, role: newUser.role});
    newUser.token = token;

  await newUser.save();

  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { user: newUser },
  });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if(!email && !password){
      const error = AppError.create("Email and password are required", 400, httpStatusText.FAIL);
      return next(error);          
    }

    const user = await User.findOne({ email });
    if (!user) {
        const error = AppError.create("User not found", 404, httpStatusText.FAIL);
        return next(error);
      }


      // Password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // generate token
        const token =await generateJWT({ email: user.email ,id: user._id, role:user.role });
        
      
        res.json({
        status: httpStatusText.SUCCESS,
        data: { token },
      });
    } else {
      const error = AppError.create("Invalid credentials", 400, httpStatusText.FAIL);
      return next(error);
    }    
});

module.exports = {
  getAllUsers,
  register,
  login,
};
