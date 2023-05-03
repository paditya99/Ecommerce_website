const mongoose=require('mongoose');

const shipSchema=new mongoose.Schema({
    
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: "India"
        },
        pincode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }


  
})

const ShipModel=new mongoose.model("ShipModel", shipSchema);

module.exports=ShipModel;