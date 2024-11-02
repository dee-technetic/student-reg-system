import Joi from 'joi';

export const registerSchema = Joi.object({
    fullname: Joi.string().max(100).required(),
    username: Joi.string().max(10).required(),
    gender: Joi.string().valid('male', 'female').required(),
    email: Joi.string().required(),
    role: Joi.string().valid('admin').required(),
    password: Joi.string().required().min(10).max(40)
})