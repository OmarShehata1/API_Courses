const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");

const userSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
        validate : [validator.isEmail, 'invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    token : {
        type: String
    },
    role: {
        type: String, // [user , admin , manger ]
        enum : [userRoles.ADMIN , userRoles.MANGER ,userRoles.USER],
        default : userRoles.USER
    }
});


module.exports = mongoose.model("User", userSchema);

