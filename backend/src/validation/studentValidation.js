import Joi from 'joi';

export const registerSchema = Joi.object({
    fullname: Joi.string().max(100).required(),
    age: Joi.number().max(),
    gender: Joi.string().valid('male', 'female').required(),
    email: Joi.string().required(),
    role: Joi.string().valid('student').required(),
    course:Joi.string().required(),
    password: Joi.string().required().min(10).max(40)
})