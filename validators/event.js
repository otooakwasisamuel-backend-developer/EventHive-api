import Joi from "joi";

export const postEventValidator = Joi.object({
  college: Joi.string().required(),
  title: Joi.string().required(),
  venue: Joi.string().required(),
  start: Joi.date().required(),
  end: Joi.date().required(),
  image: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required()).required(),
});

export const patchEventValidator = Joi.object({
  college: Joi.string(),
  title: Joi.string(),
  venue: Joi.string(),
  start: Joi.date(),
  end: Joi.date(),
  image: Joi.string(),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string().required()),
});