const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express= require("express");
const ContactModel= require('../models/contactModel');

const contactrouter=express.Router();
const ErrorHandler = require("../utils/errorHandler");

//create message
const createMessage=catchAsyncErrors(async(req,res,next)=>{
    const contactInfo= await ContactModel.create(req.body)

    res.status(201).json({
        success: true,
        contactInfo
    })
})









contactrouter.route('/contact').post(createMessage);
module.exports = contactrouter;