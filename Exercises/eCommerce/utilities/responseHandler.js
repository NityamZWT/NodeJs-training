const responseHandler = (res, statusCode, success, message, data = undefined, error = undefined) => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        error
    });
};

module.exports = responseHandler;
