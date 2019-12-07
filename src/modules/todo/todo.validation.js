import Joi from 'joi';

export default {
  todo: {
    body: {
      text: Joi.string().required(),
      priority: Joi.number().default(3).min(1).max(5),
      done: Joi.boolean().default(false),
    },
  },
};
