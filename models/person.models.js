const mongoose= require('mongoose')
const user = require('./users.models')

const personSchema = new mongoose.Schema({
    lastName:{
        type : String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    otherName:{
        type: String,
        required: false
    },
    gender:{
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter valid email']
    },

    dateOfBirth:{
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[0-9+\-\s()]+$/, 'Please enter valid phone number']
    },
    emergencyContactName:{
        type: String,
        required: true
    },
    emergencyContact: {
        type: String,
        match: [/^[0-9+\-\s()]+$/, 'Please enter valid phone number']
    },
    address:{
        type: String,
        required: true
    },
     createdAt:{
        type: Date,
        default: Date.now
    }, 
    updatedAt:{
        type: Date,
        default: Date.now
    },
    type:{
        type: String,
        required: true,
        enum: ['student', 'teacher']
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true ,
    discriminatorKey: 'type'
})