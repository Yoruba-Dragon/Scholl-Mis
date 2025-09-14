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
        ref: 'Lecturer',
        required: false
    },
    establishedDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });
departmentSchema.virtual('establishedYear').get(function(){
    return this.establishedDate.getFullYear();

})
departmentSchema.set('toJson',{virtual:true})


module.exports = mongoose.model('Department', departmentSchema);