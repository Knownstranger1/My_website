// modules

require('./config/connection')
const login = require('./routes/login')



//middlewares
const app = require('./server')


//routes
app.use(login)

