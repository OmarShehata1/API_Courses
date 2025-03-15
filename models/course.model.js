const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        price: {
            type: Number,
            required: true,
        },
});

module.exports = mongoose.model('Course', courseSchema);