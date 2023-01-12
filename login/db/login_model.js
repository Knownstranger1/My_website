let mongoose = require('mongoose')

const login_model = new mongoose.Schema({
    Name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    Role:{
        type:String,
    },
    
},{ timestamps: true})

const lmodel = new mongoose.model('login',login_model)

module.exports = lmodel