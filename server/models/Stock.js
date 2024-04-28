const mongoose = require('mongoose');

const stockSchema=new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true,
    },
    stockName:{
        type:String,
        required:true,
        trim:true,
    },
    quantity:{
        type:Number,
        require:true
    },
    total_price:{
        type:Number,
        required:true,
    },
    time:{
        type:Date,
        default:Date.now,
    },
});

module.exports=mongoose.model("Stock",stockSchema);