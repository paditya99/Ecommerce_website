const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require('../config/config.json');
const crypto=require('crypto');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength: [4,"Name should be at least 4 characters"]
    },
    email: {
        type: String,
        required: [true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true,"Please enter your password"],
        minLength: [8,"Password should be at least 8 characters"],
        select: false,
    },
    avatar: {
        avatar_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


//JWT token
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id: this._id},JWT_SECRET,{
        expiresIn: 500000
    })
}

//Encryption of the password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})


//Comparing the password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

//Generating the reset password token
userSchema.methods.getResetPasswordToken=function(){

    //Generating the token
    const resetToken=crypto.randomBytes(20).toString("hex");

    //hashing and adding the reset password token to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+ 15*60*60*1000;

    return resetToken;
}

module.exports = new mongoose.model('UserModel', userSchema);