const mongoose = require('mongoose');

const transactionSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    stockName:{
        type:String,
        required:true,
    },
    stockSymbol:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    time:{
        type:Date,
        default:Date.now,
    },
    orderType:{
        type:String,
        enum:["Buy","Sell"]
    }

    //status buy / sell 
    
});

module.exports=mongoose.model("Transaction",transactionSchema);