const mongoose=require('mongoose');

const productSchema= new mongoose.Schema({

    name: {
        type: String,
        required: [true,"Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true,"Please enter product description"]
    },
    price: {
        type: Number,
        required: [true,"Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    stock: {
        type: Number,
        required: [true,"Please enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true,"Please enter product Category"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            product_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: "UserModel"
            },
            rating: {
                type: Number,
                default: 0
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    

})

module.exports= new mongoose.model('ProductModel',productSchema);