let mongoose = require('mongoose')
require('dotenv').config()


url = process.env.url

mongoose.set("strictQuery", false);

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res=>{
        console.log(`db connected`);
}).catch(err=>{
    console.log(err);
})