const express= require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userRouter=express.Router();
const UserModel= require('../models/userModel');
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail=require('../utils/sendEmail');
const crypto=require('crypto');
const isAuthenticatedUser = require("../middleware/auth");

const registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user= await UserModel.create({
        name,email,password,
        avatar:{
            avatar_id: "avatar id",
            url: "avatar url"
        }
    })

    // const token=user.getJWTToken();
    // res.status(201).json({
    //     success: true,
    //     token
    // })

    sendToken(user,201,res);
}) 

const loginUser=catchAsyncErrors(async(req, res, next)=>{
    const {email, password}=req.body;
    if(!email || !password){
       return next(new ErrorHandler("Please enter email and password"));
    }
    const user=await UserModel.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);


})

const logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
});

//Forgot Password Recovery
const forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await UserModel.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //get ResetPassword Token
    const resetToken =user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetTokenUrl=`${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;

    const message=`Reset Password Token is: ${resetTokenUrl} \n\n If you have not requested this, please ignore this`;

    try{
        await sendEmail({                                      //calling sendEmail function
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    }catch(error){                                              //if any error comes
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave: false});
        console.log("error hai");
        return next(new ErrorHandler(error.message,500));
    }

})

//Reset Password
const resetPassword=catchAsyncErrors(async(req, res, next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired",400));
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save(); 
    sendToken(user,200,res);

})

//Accces your proile
const getProfile=catchAsyncErrors(async(req,res,next)=>{
    const user=await UserModel.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//Update user profile details
const updateProfile=catchAsyncErrors(async(req,res,next)=>{
    let user=await UserModel.findById(req.user.id);

    const newUserdata={
        name: req.body.name,
        email: req.body.email
    }
    user=await UserModel.findByIdAndUpdate(req.user.id,newUserdata);
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
    

})

//Change password by user
const changePassword=catchAsyncErrors(async(req,res,next)=>{
    let user=await UserModel.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not matched",400));
    }
    user.password = req.body.newPassword;
    await user.save(); 
    sendToken(user,200,res);
})

//Get all users by(admin)
const getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    const users=await UserModel.find();

    res.status(200).json({
        success: true,
        users
    })
})

//Get single user profile details by(admin)
const getSingleUser=catchAsyncErrors(async(req, res, next)=>{
    const user=await UserModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update user Role by(admin)
const updateUserRole=catchAsyncErrors(async(req,res,next)=>{
    let user=await UserModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400));
    }
    const newUserdata={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    user=await UserModel.findByIdAndUpdate(req.params.id,newUserdata);
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user
    })
})

//Delete the user by(admin)
const deleteUser=catchAsyncErrors(async(req,res,next)=>{
    const user=await UserModel.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,400));
    }
   
    await user.remove();
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user
    })
})

const authoriseRoles=(...roles)=>{
    
    return (req,res,next)=>{
        
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));   
        }
        next();
    }
}


userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);
userRouter.route('/password/forgot').post(forgotPassword);
userRouter.route('/password/reset/:token').put(resetPassword);
userRouter.route('/me').get(isAuthenticatedUser,getProfile);
userRouter.route('/admin/users').get(isAuthenticatedUser,authoriseRoles("admin"),getAllUsers);
userRouter.route('/admin/users/:id').get(isAuthenticatedUser,authoriseRoles("admin"),getSingleUser);
userRouter.route('/admin/users/:id').put(isAuthenticatedUser,authoriseRoles("admin"),updateUserRole);
userRouter.route('/admin/users/:id').delete(isAuthenticatedUser,authoriseRoles("admin"),deleteUser);
userRouter.route('/me/update').put(isAuthenticatedUser, updateProfile);
userRouter.route('/me/password/change').put(isAuthenticatedUser,changePassword);
module.exports=userRouter;

