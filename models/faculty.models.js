const mongoose = require('mongoose')
const Lecturer = require('./lecturer.models')

facultySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    dean:{
        type:String,
        required: false,
        
    },
    establishedDate:{
        type: Date,
        required: true
    },
},{ timestamps: true})

facultySchema.virtual('establishedYear').get(function(){
    return this.establishedDate.getFullYear();

})
facultySchema.set('toJson',{virtual:true})

module.exports = mongoose.model('Faculty', facultySchema);