const express= require('express');
const bodyParser= require('body-parser');
const router=require('./routes/productRoutes');
const errorMiddleware= require('./middleware/error');
const userRouter = require('./routes/userRoutes');
const orderRouter= require('./routes/orderRoutes');
const cookieParser=require('cookie-parser');


const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/',router);
app.use('/api/',userRouter);
app.use('/api/',orderRouter);

app.use(errorMiddleware);


module.exports =app;