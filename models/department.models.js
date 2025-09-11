const mongoose = require('mongoose');
const Faculty = require('./faculty.models');

departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code:{
        type :String,
        required: true,
        unique: true,
        trim: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer'
    },
    establishedYear: {
        type: Date().getFullYear(),
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);