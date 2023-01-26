const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt= require('jsonwebtoken');
const {JWT_SECRET}=require('../config/config.json');
const UserModel= require('../models/userModel');

const isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const token=req.cookies.token;
    
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    
    const decodedData=jwt.verify(token,JWT_SECRET);
    
    req.user=await UserModel.findById(decodedData.id);
  
    next();

})

// module.exports=function authorizeRoles(...roles){
   
//     return (req,res,next)=>{
//         console.log(req.user.role);
//         if(!roles.includes(req.user.role)){
//             new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403);
            
//         }
//         next();
//     }
// }


module.exports=isAuthenticatedUser;
