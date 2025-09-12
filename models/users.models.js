const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') 



userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: [20, 'Username cannot be more than 20 characters']
    },
 password:{
        type:String,
        required:true,
        minlength: 8,
        select: false
    },
    role:{
        type:String,
        required:true,
        enum: ['admin', 'teacher', 'student']
    },
    permissions:[String],

    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    lastLogin:Date,
    isActive:{
        type: Boolean,
        default: true
    }
}, { timestamps: true })

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, role: this.role}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return token
}

module.exports = mongoose.model('User', userSchema)