const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).required(),
    role: Joi.string().valid('Admin','User').required(),
    isActive: Joi.boolean().valid('true','false').default(true),
});

const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(18).optional(),
    role: Joi.string().valid('Admin','User').optional(),
    isActive: Joi.boolean().valid('true','false').optional(),
});

const userIdSchema = Joi.object({
    id: Joi.number().required(),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
};
