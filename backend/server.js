const app=require('./app');
const dotenv=require('dotenv');
//const dotenv=require('./config/config.env');
const connection = require('./config/database');

//dotenv.config({path: 'backend/config/config.env'});
//dotenv.config();
const port=4000
//const PORT=process.env.PORT;
//Uncaught exceptions
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to Uncaught exceptions');
    process.exit(1);
})

const server=app.listen(port,()=>{
    console.log(`Server is running on: http://localhost:${port}`);
})

//Connecting the server
connection();

//Unhandled Promise Rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Server is shutting down due to Unhandled Promise Rejection');

    server.close(()=>{
        process.exit(1);
    });
})