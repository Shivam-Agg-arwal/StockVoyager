const mongoose = require('mongoose');

const profileSchmema=new mongoose.Schema({
    gender:{
        type:String,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        trim:true,
    },
    about:{
        type:String,
    },
});

module.exports=mongoose.model("Profile",profileSchmema);