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
    price:{
        type:Number,
        required:true,
    },
    time:{
        type:Date,
        default:Date.now,
    },

    //status buy / sell 
    
});

module.exports=mongoose.model("Transaction",transactionSchema);