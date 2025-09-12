const mongoose = require('mongoose')
const Department = require('./department.models')
const Faculty = require('./faculty.models')
const Person = require('./person.models')
const {generateStudentNumber} = require('../utils/id.utils')


studentSchema = new mongoose.Schema ({

    studentNumber:{
        type: String,
        required: false,
        unique: true,
        trim: true
    },

    level:{
        type: String,
        required: true,
        enum: ['100', '200', '300', '400', '500', '600']
    },

    program:{
        type: String,
        required: true
    },

    enrollmentDate:{
        type: Date,
        required: true
    },

    graduationDate: Date,

    cgpa: {
    type: Number,
    min: 0,
    max: 5.0
},
    status:{
        type: String,
        required: true,
        enum: ['active', 'graduated', 'dropped'],
        default: 'active'
    },

    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: false
    },
    faculty:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Faculty',
       required: false
    },

    accommodationType:{
        type: String,
        enum: ['on-campus', 'off-campus' ]}
    
    })

studentSchema.pre('save', async function(next){
    try{
    if (this.isNew && ! this.studentNumber){
        const enrollmentYear = this.enrollmentDate.getFullYear();
        this.studentNumber = await generateStudentNumber(enrollmentYear);

    }
    next();
    } catch (error){
        next(error);
    }
    })



studentSchema.index({ studentNumber: 1 });
studentSchema.index({ level: 1 });
studentSchema.index({ program: 1 });

studentSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName} ${this.otherName ? this.otherName : ''}`.trim()
})

module.exports = Person.discriminator('Student', studentSchema)