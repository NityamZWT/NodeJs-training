
//common response handler
const responseHandler = (res, statusCode, success, message, data = undefined, error = undefined) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        error
    });
};

//handling yup error manually
const handleYupError = (error, res) => {

    const formattedErrors = error.inner.map(err => ({
        message: err.message
    }));

    const responseMessage = formattedErrors.map(i => i.message);

    return responseHandler(res, 400, false, responseMessage);
};

//handling database error manually(unikque contraint error)
const handleDatabaseError = (error, res) => {

    const formattedErrors = error.errors.map(err => ({
        path: err.path,
        message: err.message,
    }));

    const responseMessage = formattedErrors.map(i => i.message);

    return responseHandler(res, 500, false, responseMessage);
};


module.exports = {responseHandler, handleYupError, handleDatabaseError};
