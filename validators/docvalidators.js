import Joi from "joi";

export const registerDoctorValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
  specialty: Joi.string().valid(),
  
}).with("password", "confirmPassword");

export const loginDoctorValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().required(),
  specialty: Joi.string().valid()
});


