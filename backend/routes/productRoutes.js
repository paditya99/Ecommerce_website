const express= require("express");
const isAuthenticatedUser = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const UserModel= require('../models/userModel');
const authorizeRoles = require("../middleware/authRoles");
//const authorizeRoles=require('../middleware/auth.js');
// const getAll = require("../controllers/productController");
// const createProduct = require("../controllers/productController");
// const getAllProducts = require("../controllers/productController");


const router=express.Router();
const productModel=require('../models/productModel')

const ApiFeatures=require('../utils/apiFeatures'); 
const ErrorHandler = require("../utils/errorHandler");

//Get all products
const getAllProducts=catchAsyncErrors(async(req,res)=>{
    const resultsPerPage=8;
    const productsCount=await productModel.countDocuments();
    const apifeature=new ApiFeatures(productModel.find(),req.query).search().filter().pagination(resultsPerPage);
    const allproducts=await apifeature.query;
    res.status(200).json({
        success: true,
        allproducts,
        productsCount
    })
})

//Create a new product
const createProduct=catchAsyncErrors(async(req,res)=>{
    
     req.body.user= req.user.id;
    const product= await productModel.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

//Update product
const updateProduct = catchAsyncErrors(async(req, res,next)=>{
    let product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    product=await productModel.findByIdAndUpdate(req.params.id,req.body);
    
    res.status(200).json({
        success: true,
        product
    })
})

//Delete a product
const deleteProduct = catchAsyncErrors(async(req, res) => {
    const product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})

//Get a product details
const getProductdetail=catchAsyncErrors(async(req,res)=>{
    const product = await productModel.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found", 404));
    }
    res.status(200).json({
        success: true,
        product,
        productsCount
    })
})

const createProductReviews=catchAsyncErrors(async(req, res, next)=>{
    const {rating,comment,productId}=req.body;
    const review={
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product=await productModel.findById(productId);
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString()){
                rev.rating=rating;
                rev.comment=comment;
            }
        })
        
    }
    else{
        product.reviews.push(review);
        product.noOfReviews=product.reviews.length;
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg=avg+rev.rating
    })

    product.ratings=avg/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })

})

//Get all reviews of a product
const getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await productModel.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete product reviews
const deleteReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await productModel.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews= product.reviews.filter(rev=> rev._id.toString() !==req.query.id.toString());
    
    let avg=0;
    reviews.forEach(rev=>{
        avg=avg+rev.rating
    })
    const ratings=avg/reviews.length;
    const noOfReviews=reviews.length;

    await productModel.findByIdAndUpdate(req.query.productId, {reviews,ratings,noOfReviews});

    res.status(200).json({
        success: true,
    })
})


router.route('/products').get(getAllProducts);
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/products/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(isAuthenticatedUser,authorizeRoles("admin"),getProductdetail);
router.route('/review').put(isAuthenticatedUser,createProductReviews);
router.route('/allreview').get(getProductReviews);
router.route('/deletereview').delete(isAuthenticatedUser,deleteReviews)

module.exports = router;