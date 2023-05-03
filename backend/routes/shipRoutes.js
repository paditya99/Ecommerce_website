const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express= require("express");
const ShipModel= require('../models/shipModel');

const shiprouter=express.Router();
const ErrorHandler = require("../utils/errorHandler");

//create message
const createShip=catchAsyncErrors(async(req,res,next)=>{
    const shipInfo= await ShipModel.create(req.body)

    res.status(201).json({
        success: true,
        shipInfo
    })
})









shiprouter.route('/order').post(createShip);
module.exports = shiprouter;