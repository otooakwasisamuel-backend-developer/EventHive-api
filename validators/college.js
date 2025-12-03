import Joi from "joi";

export const postCollegeValidator = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().required(),
  image: Joi.string().required(),
  address: Joi.string().required(),
  rating: Joi.number().required(),
});

export const patchCollegeValidator = Joi.object({
  name: Joi.string(),
  bio: Joi.string(),
  image: Joi.string(),
  address: Joi.string(),
  rating: Joi.number(),
});