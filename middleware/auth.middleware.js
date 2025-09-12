const jwt = require('jsonwebtoken');
const User = require('../models/users.models');


exports.protect = async (req, res, next) => {
    console.log('=== AUTH MIDDLEWARE CALLED ===');
  console.log('Headers:', req.headers);
  console.log('Cookies:', req.cookies);
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
    console.log('Token from cookies:', token);
  }


  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; // <-- FIXED
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const userId = decoded._id || decoded.id

    if (!userId){
        console.log ('no user id in token')
        return res.status(401).json({
            success: false,
            message: "Invalid token format"
        })
    }
    const user = await User.findById(userId).select("-password")
    console.log('user found')

    if(!user){
        return res.status(401).json({
            success: false,
            message: "User not found"
        })
    }

    req.user= user;
    console.log('req.user set to:', req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
exports.admin =(req,res,next) =>{
    if (req.user && req.user.role === 'admin'){
         next();
    }else{
    res.status(403).json({message: 'Not authorized as an admin'});
    }
}  
exports.authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Use Bearer <token>'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Authenticating with token:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded:', decoded);

    const user = await User.findById(decoded._id).select('-password');
    console.log('Found user:', user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};