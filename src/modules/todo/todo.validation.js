import Joi from 'joi';

export default {
  createTodo: {
    body: {
      // email: Joi.string().email().required(),
      // password: Joi.string().min(6).max(60).required(),
    },
  },
  updateTodo: {
    body: {
      // email: Joi.string().email(),
      // password: Joi.string().min(6).max(60),
    },
  },
};
