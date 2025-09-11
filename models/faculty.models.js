const mongoose = require('mongoose')
const Lecturer = require('./lecturers.models')

facultySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    dean:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer'
    },
    establishedYear:{
        type: Date().getFullYear(),
        required: true
    },
},{ timestamps: true})



module.exports = mongoose.model('Faculty', facultySchema);