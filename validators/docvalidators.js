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
  specialty: Joi.string().valid("Genral Physician", "Public Health","Pediatrician", "Gynaecologist")
});


export const responseValidator = Joi.object({
diagnosis : Joi.string().min(10).max(1000).required().messages({
  'string.empty': 'Diagnosis is required',
    'string.min': 'Diagnosis must be at least 10 characters',
    'string.max': 'Diagnosis must not exceed 1000 characters',
}),
prescription : Joi.array().items(
Joi.object({
  medication:Joi.string().required(),
dosage: Joi.string().required(),
duration :Joi .string().required()
})
).required(),


image: Joi.string().optional(),

referral : Joi.string().optional(),

referral_reason : Joi.string().optional()
});




