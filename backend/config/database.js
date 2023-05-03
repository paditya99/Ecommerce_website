const mongoose = require('mongoose');

const connection=()=>{
    mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{
        console.log('Connected to MongoDB'); 
    })
}

module.exports=connection;


// const mongoose = require("mongoose");
// const {MONGO_URI}=require('../config/config.json');

// const connection = async () => {
//   try {
//     mongoose.set("strictQuery", false);
//     const conn = await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`Error: ${error.message}`);
//     process.exit();
//   }
// };

// module.exports = connection;