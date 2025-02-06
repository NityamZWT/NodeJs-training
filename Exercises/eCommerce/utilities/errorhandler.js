const responseHandler = require('./responseHandler')

//handling yup error manually
const handleYupError = (error, res) => {

    const formattedErrors = error.inner.map(err => ({
        message: err.message
    }));

    const responseMessage = formattedErrors.map(i => i.message);

    return responseHandler(res, 400, false, responseMessage);
};

//handling database error manually(unikque contraint erro)
const handleDatabaseError = (error, res) => {

    const formattedErrors = error.errors.map(err => ({
        path: err.path,
        message: err.message,
    }));

    const responseMessage = formattedErrors.map(i => i.message);

    return responseHandler(res, 400, false, responseMessage);
};

module.exports={
    handleYupError,
    handleDatabaseError
}