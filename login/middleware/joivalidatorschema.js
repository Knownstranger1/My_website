const joi = require("joi");
const schema = joi.object({
  name: joi.string().min(2).max(15).required().messages({
    'string.empty': `Name cannot be an empty field`,
    'string.min': `Name should have a minimum length of 2`,
    'string.max': `Name should have a miximum length of 15`,
    'any.required': `Name is a required field`
  }),
  email: joi.string().lowercase().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).messages({
    'string.empty': `Email cannot be an empty field`,
    'string.email': `Invalid Email`,
    'any.required': `Email is a required field`
  }),
  password: joi.string().min(8).max(20).required().messages({
    'string.empty': `password cannot be an empty field`,
    'string.min': `password should have a minimum length of 8`,
    'string.max': `password should have a miximum length of 20`,
    'any.required': `password is a required field`
  }),
});


module.exports = {
  schema,
}


module.exports.token = (req, res, next) => {
  const { body } = req.headers
  if (body == 'null' || body == '') {
      res.status(401).send({ message: "Token Missing" })
  }
  else {
      next()
  }
}