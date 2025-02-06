const responseHandler = require('../utilities/customHandler');

//global error handler
const globalErrorHandler = (err, req, res, next) => {
    console.error("Error: ", err);

    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    return responseHandler(res, statusCode, false, message, null, null);
};

module.exports = globalErrorHandler;
