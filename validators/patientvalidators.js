import Joi from "joi";

export const registerPatientValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
}).with("password", "confirmPassword");

export const loginPatientValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
});

export const postValidator = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  specialty: Joi.string().valid("General Physician", "Public Health","Pediatrician", "Gynaecologist"),
  location : Joi.string().required(),
  followUpContact : Joi.string().required()
});