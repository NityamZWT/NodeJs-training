const { idSchema } = require('../validators/idValidator')
const yup = require('yup');
const { handleYupError} = require('../utilities/customHandler')

//id in params error handler
const idMiddleware = async (req, res, next) => {
    try {
        await idSchema.validate(req.params, { abortEarly: false });
        next()
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return handleYupError(error, res);
        }
        next(error)
    }
}

module.exports = idMiddleware