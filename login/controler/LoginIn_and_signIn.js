//modules
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let login_model = require("../db/login_model");
const jwt = require("jsonwebtoken");
const otpmodel = require("../db/otpmodel");
const validations = require("../middleware/joivalidatorschema");
const axios = require("axios");
require("dotenv").config();


//functions
module.exports.singup = async (req, res) => {
 res.status(200).send({message:'Signup get'})
};

module.exports.singuppost = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { name, email, password } = req.body;
    const passwordhashed = await bcrypt.hash(password, salt);
    const person = new login_model({
      Name: name,
      email: email,
      password: passwordhashed,
      Role: "USER",
    });

    const result = validations.schema.validate(req.body);
    if (result.error) {
      res.status(400).send(result.error);
      return;
    }
    let data = await login_model.findOne({ email: email });
    if (data) {
      res.status(400).send({ details: [{ message: "Email already exits" }] });
    } else {
      await person
        .save()
        .then(() => {
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          res.status(500).json({ message: "Try again", error: err });
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error });
  }
};

module.exports.loginget = (req, res) => {
  res.status(200).send({message:'Login get'})
};

module.exports.loginPost = async (req, res) => {
 try {
  const { email, password } = req.body;
  const url = `http://localhost:3000/gettoken?email=${email}`;
  let data = await login_model.findOne({ email: email })
  if (!data) {
    res.status(409).json({ message: "Invalid Email" });
  } else {
    if (await bcrypt.compare(password, data.password)) {
      res.redirect(url);
    } else {
      res.status(409).json({ message: "Invalid Password" });
    }
  }
 } catch (error) {
  res.status(500).send({ message: "Internal Server Error" });
 }
}

module.exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const checker = await otpmodel.otp.findOne({ email: email });
    if (checker) {
      await otpmodel.otp.findOneAndDelete({ email: email });
    }
    const data = await login_model.findOne({ email: email });
    if (!data) {
      res.status(400).send({ message: "Invalid Email" });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000)

    const hashopt = new otpmodel.otp({
      email: email,
      number: otp,
    });
    await hashopt
      .save()
      .then((res) => {})
      .catch((err) => {
        res.status(500).send({ message: "Mongoose Error", error: err });
      });
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.my_email,
        pass: process.env.my_email_password,
      },
    });
    let mailOptions = {
      from: process.env.my_email,
      to: email,
      subject: "Sending Email using Node.js",
      text: `Password Reset otp ${otp}`,
    };

    await transporter
      .sendMail(mailOptions)
      .then((result) => {
        res.status(200).send({ message: "Success fully mailed the otp" });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports.otpget = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const checker = await otpmodel.otp.findOne({ email: email });
    if (!checker) {
      res.status(400).send({ message: "Something happened Try again Later" });
    } else {
      if (otp == checker.number) {
        res.status(200).send({ message: "Please Change your password" });
      } else {
        res.status(400).send({ message: "Invalid Otp" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};


module.exports.updatepassword = async (req,res)=>{
 try {
  const {email , password } = req.body 
  const salt = await bcrypt.genSalt(10)
  const hashedpassword = await bcrypt.hash(password,salt)
  if(!password){
    res.status(400).send({message:'Password can not be Emptry'})
    return
  }
  let data = await login_model.findOne({ email: email });
  const checker = await bcrypt.compare(password,data.password)
 if(checker){
  res.status(409).send({message:'Password Cannot be same as old Password'})
  return
 }
   await login_model.findOneAndUpdate({email:email},{password:hashedpassword}).then(e=>{
    res.status(200).send({message:'Password Updated'})
  }).catch(err=>{
    res.status(400).send({error:err})
  })
 } catch (error) {
  res.status(500).send({ message: "Internal Server Error" });
 }
}


// thumb gallary get
module.exports.thumbgallery = async (req, res) => {
  const { lang, page } = req.query;
  const recentanimes = {
    method: "GET",
    url: "https://gogoanime2.p.rapidapi.com/recent-release",
    params: { type: `${lang}`, page: `${page}` },
    headers: {
      "X-RapidAPI-Key": process.env.anime_api_key,
      "X-RapidAPI-Host": process.env.anime_host,
    },
  };

  axios
    .request(recentanimes)
    .then(function (response) {
      let animesynopsis = []
      let animedata = response.data;
      animedata.forEach(async (e) => {
        const search = {
          method: "GET",
          url: `https://gogoanime2.p.rapidapi.com/anime-details/${e.animeId}`,
          headers: {
            "X-RapidAPI-Key": process.env.anime_api_key,
            "X-RapidAPI-Host": process.env.anime_host,
          },
        }
        let data = axios
          .request(search)
          .then((r) => {
            let synopsis = {
              data: r.data,
            };
            return synopsis
          })
        animesynopsis.push(data);
      })
      Promise.all(animesynopsis).then(async g => {
        await res
          .status(200)
          .send({ synopsis: g });
      })

    })
    .catch(async function (error) {
      await res
        .status(401)
        .send({
          response: error,
          message: "Problem will be fixed in Sometime future",
        });
    });
};

//dashboard get
module.exports.dashboard = (req, res) => {
  res.status(200).send({ message: "Welcome" });
};


module.exports.newRealease = async (req, res) => {
  const { lang, page } = req.query;
  const recentanimes = {
    method: "GET",
    url: "https://gogoanime2.p.rapidapi.com/recent-release",
    params: { type: `${lang}`, page: `${page}` },
    headers: {
      "X-RapidAPI-Key": process.env.anime_api_key,
      "X-RapidAPI-Host": process.env.anime_host,
    },
  };
  let animedata = await axios.request(recentanimes)
  let data = JSON.parse(JSON.stringify(animedata.data))
  await res.status(200).send({ data: data })
}

module.exports.search = async (req, res) => {
  const { name, page } = req.query
  let reg = new RegExp(/^-?\d+\.?\d*$/)
  if (!name || name.match(reg)) {
    res.status(422).send({ message: "Invalid Name" })
    return
  }
  const options = {
    method: 'GET',
    url: 'https://gogoanime2.p.rapidapi.com/search',
    params: { keyw: `${name}`, page: '1' },
    headers: {
      'X-RapidAPI-Key': '9edf1bad5dmshc9484e0e0683befp1e948djsn34603c51b0b4',
      'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
    }
  };

  await axios.request(options).then(async (response) => {
    await res.status(200).send({ data: response.data })
  }).catch(async function (error) {
    await res
        .status(401)
        .send({
          response: error,
          message: "Problem will be fixed in Sometime future",
        });
  });
}

module.exports.watch = async (req, res) => {
  const { id } = req.query
  const options = {
    method: 'GET',
    url: `https://gogoanime2.p.rapidapi.com/anime-details/${id}`,
    headers: {
      "X-RapidAPI-Key": process.env.anime_api_key,
      "X-RapidAPI-Host": process.env.anime_host,
    }
  };
 await axios.request(options).then(async (response)=> {
    await res.status(200).send({ data: response.data })
  }).catch(async function (error) {
    await res
        .status(401)
        .send({
          response: error,
          message: "Problem will be fixed in Sometime future",
        });
  });
}

module.exports.stream =async (req,res)=>{
  const {id} = req.query
  const options = {
    method: 'GET',
    url: `https://gogoanime2.p.rapidapi.com/vidcdn/watch/${id}`,
    headers: {
      'X-RapidAPI-Key': '9edf1bad5dmshc9484e0e0683befp1e948djsn34603c51b0b4',
      'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
    }
  };

  axios.request(options).then(async (response)=> {
    await res.status(200).send({ data: response.data })
  }).catch(async function (error) {
    await res
        .status(401)
        .send({
          response: error,
          message: "Problem will be fixed in Sometime future",
        });
  });
}

module.exports.logintoken = async (req, res) => {
  try {
    const { email } = req.query
    let data = await login_model.findOne({ email:email });
    let key = process.env.JWT_SECRET_KEY;
    let data1 = {
        time: Date(),
        userId: data._id,
    }
    const token = jwt.sign(data1,key,{expiresIn:'1d'});
    res.send({code:200,token:token})
  } catch (err) {
    console.log(err);
  }
}

module.exports.genreget = async (req,res)=>{
  const { genre,page } = req.query
 const options = {
    method: 'GET',
    url: `https://gogoanime2.p.rapidapi.com/genre/${genre}`,
    params: {page: `${page}`},
    headers: {
      'X-RapidAPI-Key': '9edf1bad5dmshc9484e0e0683befp1e948djsn34603c51b0b4',
      'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    res.status(200).json({data:response.data})
  }).catch(function (error) {
    res.status(404).json({message:"Working on it Server Problem"})
  });
}

module.exports.movies = async (req,res)=>{
  const {movie,page} = req.query
  const options = {
    method: 'GET',
    url: 'https://gogoanime2.p.rapidapi.com/anime-movies',
    params: {aph: `${movie}`, page: `${page}`},
    headers: {
      'X-RapidAPI-Key': '9edf1bad5dmshc9484e0e0683befp1e948djsn34603c51b0b4',
      'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
    }
  };
  axios.request(options).then(function (response) {
    res.status(200).json({data:response.data})
  }).catch(function (error) {
    res.status(404).json({message:"Working on it Server Problem"})
  });
}

module.exports.popular =(req,res)=>{
  const { page } = req.query
  const options = {
    method: 'GET',
    url: 'https://gogoanime2.p.rapidapi.com/popular',
    params: {page: `${page}`},
    headers: {
      'X-RapidAPI-Key': '9edf1bad5dmshc9484e0e0683befp1e948djsn34603c51b0b4',
      'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    res.status(200).json({data:response.data})
  }).catch(function (error) {
    res.status(404).json({message:"Working on it Server Problem"})
  })
}