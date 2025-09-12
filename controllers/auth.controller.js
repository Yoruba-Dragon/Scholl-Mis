const User= require('../models/users.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');


const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

 exports.login = async (req,res)=>{
    

    const {username,password} = req.body
    
    if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
    }
    try{
        const isUser = await User.findOne({username}).select('+password');
        if(!isUser){
            return res.status(400).json({message :'invalid credentials'})
        }
        console.log("DB hash:", isUser.password);
    console.log("Entered password:", password);
        const isValid =  await bcrypt.compareSync(password, isUser.password)
        console.log("Password match:", isValid)
        if (!isValid){
            return res.status(400).json({message: 'invalid credentials'})
        }
        const token = generateToken(isUser)
        isUser.lastLogin = Date.now()
        await isUser.save()
        res.status(200).cookie(
            'token', token, 
            { httpOnly: true,
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
            }).json({ message: 'Login successful', token})
            console.log("Found user:", isUser);
console.log("DB password:", isUser?.password);
console.log("Entered password:", password);
    
    }catch (err){
        res.status(500).json({message: 'Server error'})
    }
 }

 exports.logout = (req,res)=>{
    res.clearCookie('token').json({message: 'Logged out successfully'})
 }  
 exports.register= async (req,res)=>{
   
    const {username, password, role} = req.body
     if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
    }
    if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }
    try{
        const isUser = await User.findOne({username})
        if(isUser){
            return res.status(400).json({message: 'Username already exists'})
        }
      
        const newUser = await User.create({username, password, role})
        const token = generateToken(newUser)
        res.status(201).cookie(
            'token', token,
            { httpOnly: true ,
            sameSite:'strict',
            maxAge: 24 * 60 * 60 * 1000 })// 1 day
        .json({ message: 'Registration successful', token})
        console.log("Login attempt:", username);
console.log("Found user:", isUser);
console.log("DB password:", isUser?.password);
console.log("Entered password:", password);
    }catch (err){
        res.status(500).json({message: 'Server error' + err.message})
    }
 }
