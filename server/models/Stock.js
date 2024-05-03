const mongoose = require('mongoose');

const stockSchema=new mongoose.Schema({
    stockSymbol:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
    },
    total_price:{
        type:Number,
    },
});

module.exports=mongoose.model("Stock",stockSchema);