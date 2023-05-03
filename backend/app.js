const express= require('express');
const bodyParser= require('body-parser');
const router=require('./routes/productRoutes');
const errorMiddleware= require('./middleware/error');
const userRouter = require('./routes/userRoutes');
const orderRouter= require('./routes/orderRoutes');
const shiprouter= require('./routes/shipRoutes');
const cookieParser=require('cookie-parser');
const fileUpload=require("express-fileupload");
const contactrouter = require('./routes/contactRoute');

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" })); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/api/',router);
app.use('/api/',userRouter);
app.use('/api/',orderRouter);
app.use('/api/',contactrouter);
app.use('/api/',shiprouter);

app.use(errorMiddleware);


module.exports =app;