const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18).required(),
    role: Joi.string().valid('Admin','User').required(),
    isActive: Joi.boolean().valid(true, false).default(true),
});

const updateUserSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    age: Joi.number().integer().min(18).optional(),
    role: Joi.string().valid('Admin','User').optional(),
    isActive: Joi.boolean().valid(true,false).optional(),
});

const userIdSchema = Joi.object({
    id: Joi.number().required(),
});

const profileId = Joi.object({
    userId: Joi.number().required(),
})

const querySchema = Joi.object({
    role: Joi.string().valid('Admin','User').optional(),
    isActive: Joi.string().valid('true','false').optional(),
    age: Joi.string().optional(),
})

const profileSchema = Joi.object({
    userId: Joi.number().required(),
    bio: Joi.string().required().min(3).max(100),
    linkedInUrl: Joi.string().uri().required(),
    facebookUrl: Joi.string().uri().required(),
    instaUrl: Joi.string().uri().required(),
})

module.exports = {
    createUserSchema,
    updateUserSchema,
    userIdSchema,
    querySchema,
    profileSchema,
    profileId
};
