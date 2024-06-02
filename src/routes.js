const { addUserHandler, userlogin } = require("./handler");
const Joi = require('joi');

const routes = [
    {
      method: 'POST',
      path: '/register',
      handler: addUserHandler,
      options: {
        validate: {
          payload: Joi.object({
              name: Joi.string().required(),
              email: Joi.string().email().required(),
              password: Joi.string().required()
          })
      }
    }
    },
    {
      method: 'POST',
      path: '/login',
      handler: userlogin,
      options: {
        validate: {
          payload: Joi.object({
              email: Joi.string().email().required(),
              password: Joi.string().required()
          })
      }
    }
  }

];

module.exports = routes;