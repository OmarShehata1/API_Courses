const User = require("../models/user.model");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/appError");


const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 20;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users: users } });
});

const register = asyncWrapper(async (req, res,next) => {
  console.log(req.body);
  const { firstName, lastName, email, password } = req.body;
  
  const oldUser = await User.findOne({ email: email });
    if (oldUser) {
        const error = AppError.create("User already exists", 400, httpStatusText.FAIL);
        return next(error);
    }
  
  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
  });
    await newUser.save();
    res.status(201).json({
       status: httpStatusText.SUCCESS,
      data: { user: newUser },
    });
});

const login =asyncWrapper( async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
    // res.json({
    //     status: httpStatusText.SUCCESS,
    //     data: { user: user },
    // });
});

module.exports = {
  getAllUsers,
  register,
  login,
};
