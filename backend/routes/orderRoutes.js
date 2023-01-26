const express= require("express");
const isAuthenticatedUser = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const UserModel= require('../models/userModel');
const ProductModel= require('../models/productModel');

const ErrorHandler = require("../utils/errorHandler");
const OrderModel = require("../models/orderModel");
const { response } = require("../app");
const authorizeRoles = require("../middleware/authRoles");
const router=express.Router();

//Create new Order
const createOrder=catchAsyncErrors(async(req,res)=>{

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;

    const order=await OrderModel.create({
        shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice,
        user: req.user._id,
        paidAt: Date.now()
    });

    res.status(201).json({
        success: true,
        order
    })
})

//Get single order
const getSingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await OrderModel.findById(req.params.id).populate("user", "name email");
    if(!order){
        return next(new ErrorHandler(`Order not found with this id ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get logged in user (my order)
const getmyOrder=catchAsyncErrors(async(req,res,next)=>{
    const orders=await OrderModel.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders
    })
})

//get all orders --(by admin)
const getAllOrder=catchAsyncErrors(async(req,res,next)=>{
    const orders=await OrderModel.find();

    let total=0;
    orders.forEach(order=>{
        total=total+order.totalPrice
    })
    res.status(200).json({
        success: true,
        orders,
        total
    })
})

//update order details --(by admin)
const updateOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await OrderModel.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`Order not found with this id ${req.params.id}`, 404));
    }
    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("You have already delivered this order",404));
    }

    order.orderItems.forEach(async(o)=>{
        const s_product=await ProductModel.findById(o.product)
        s_product.stock=s_product.stock-o.quantity;
        await s_product.save({validateBeoreSave: false})
    })
    console.log(req.body.status);
    order.orderStatus=req.body.status;
    console.log(order.orderStatus);
    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
    await order.save({validateBeoreSave: false});
    res.status(200).json({
        success: true,
    })
})

//Delete order--(by admin)
const deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await OrderModel.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler(`Order not found with this id ${req.params.id}`, 404));
    }
    await order.remove();

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    })
})

router.route('/order/new').post(isAuthenticatedUser,createOrder);
router.route('/order/:id').get(isAuthenticatedUser,getSingleOrder);
router.route('/order/me').get(getmyOrder);
router.route('/admin/orders').get(isAuthenticatedUser,authorizeRoles("user"),getAllOrder);

router.route('/admin/order/:id')
.put(isAuthenticatedUser,authorizeRoles("user"),updateOrder)
.delete(isAuthenticatedUser,authorizeRoles("user"),deleteOrder);

module.exports = router;