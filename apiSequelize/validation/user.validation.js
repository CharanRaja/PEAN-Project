const Joi = require('joi');

module.exports = {
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      emailId: Joi.string().email().required(),
      password: Joi.string().required(),
      country: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },
};
