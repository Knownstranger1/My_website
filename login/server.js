let express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.port
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
const cors = require('cors')
app.use(cors())
app.listen(port,()=>{
    console.log(`listening on port ${port}  and its login and signup port here`);
})


module.exports = app