
const mongoose = require("mongoose")

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name must be provided"]
    },
    price:{
        type:Number,
        required:[true,"Price must be provided"]
    },
    company:{
        type:String,
        required:[true,"Company must be provided"],
        enum:{
            values:["ikea","liddy","marcos","caressa"],
            message: `{VALUE} is not supported`
        }
    },
    rating:{
        type:Number,
        default:4.5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    featured:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Products",productsSchema)