module.exports = (err, req, res, next) => {
    try {
        console.log(err);
        err.httpStatus = err.httpStatus || 500;

        return res
            .status(err.httpStatus)
            .send({ message: err.message, details: err.details });
    } catch (err) {
        next(err);
    }
};
  