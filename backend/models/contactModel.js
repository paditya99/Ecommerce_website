const mongoose=require('mongoose');
const validator=require('validator');

const contactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength: [4,"Name should be at least 4 characters"]
    },
    email: {
        type: String,
        required: [true,"Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    contact_no: {
        type: Number,
        required: true,
        minLength: [10,"Phone number should be of 10 digits"]
    },
    message: {
        type: String,
        required: true
    }
    
   
})




module.exports = new mongoose.model('ContactModel', contactSchema);