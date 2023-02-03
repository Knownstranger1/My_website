let mongoose = require('mongoose')


const otpschema = new mongoose.Schema({
    email:{
        type:String
    },
    number:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:{expires:300}
    }
},{ timestamps: true})

module.exports.otp = mongoose.model('otp',otpschema)