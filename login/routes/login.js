//modules
const router = require('express').Router()
const validations = require('../middleware/joivalidatorschema')
const Login_and_Singup = require('../controler/LoginIn_and_signIn')

//routes
router.get('/signup',Login_and_Singup.singup)
.post('/signup',Login_and_Singup.singuppost)
.get('/login',Login_and_Singup.loginget)
.post('/login',Login_and_Singup.loginPost)
.post('/login/reset', Login_and_Singup.forgetPassword)
.post('/login/otp',Login_and_Singup.otpget)
.put('/login/updatepassword',Login_and_Singup.updatepassword)
.get('/dashboard',validations.token,Login_and_Singup.dashboard)
.get('/dashboard/thumbgallery',Login_and_Singup.thumbgallery)
.get('/dashboard/cards',Login_and_Singup.newRealease)
.get('/dashboard/search',Login_and_Singup.search)
.get('/dashboard/watch',Login_and_Singup.watch)
.get('/dashboard/stream',Login_and_Singup.stream)
.get("/gettoken",Login_and_Singup.logintoken)
.get('/dashboard/genre',Login_and_Singup.genreget)
.get('/dashboard/movie',Login_and_Singup.movies)
.get('/dashboard/popular',Login_and_Singup.popular)
//expoter
module.exports = router