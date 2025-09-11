const mongoose = require('mongoose')
const Faculty = require('./faculty.models')

courseSchema = new mongoose.Schema({

    courseCode:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    department: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

courseSchema.index({ courseCode: 1 });
courseSchema.index({ department: 1 });
courseSchema.index({ faculty: 1 });

module.exports = mongoose.model('Course', courseSchema);