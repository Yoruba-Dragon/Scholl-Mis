const mongoose = require('mongoose');
const Department = require('./department.models');
const Faculty = require('./faculty.models');
const Person = require('./person.models');

const lecturerSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    hireDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    rank:{
        type: String,
        required: true,
        enum: ['assistant lecturer', 'lecturer II', 'lecturer I', 'senior lecturer', 'associate professor', 'professor']
    },
    certifications: [String],
    coursesTaught: [String],
    status: {
        type: String,
        required: true,
        enum: ['active', 'on leave', 'retired'],
        default: 'active'
    }
});

lecturerSchema.index({ employeeId: 1 });
lecturerSchema.index({ department: 1 });
lecturerSchema.index({ faculty: 1 });



lecturerSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName} ${this.otherName ? this.otherName : ''}`.trim();
});

module.exports = Person.discriminator('Lecturer', lecturerSchema);