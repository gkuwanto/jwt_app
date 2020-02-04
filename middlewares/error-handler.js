module.exports = (err, req, res, next) => {
    try {
        err.httpStatus = err.httpStatus || 500;
        return res
            .status(err.httpStatus)
            .json({ message: err.message, details: err.details });
    } catch (err) {
        next(err);
    }
};
  