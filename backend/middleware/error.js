const ErrorHandler=require('../utils/errorHandler')

module.exports=(err,req,res,next)=>{
    
    //Initialization
    err.message = err.message || "Internal Server Error";
    err.statusCode= err.statusCode || 500;

    //Wrong id error
    if(err.name==="CastError"){
        const message=`Resource Not Found, Invalid: ${err.path}`;
        err=new ErrorHandler(message,400);
    }

    //Duplicate entry error
    if(err.code==11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} found`;
        err=new ErrorHandler(message,400);
    }
    
    //Wrong JWT token error
    if(err.name==="JsonWebTokenError"){
        const message=`JWT token is invalid, try again`;
        err=new ErrorHandler(message,400);
    }

    //JWT token expire error
    if(err.name==="TokenExpiredError"){
        const message=`JWT token is expired, try again`;
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}