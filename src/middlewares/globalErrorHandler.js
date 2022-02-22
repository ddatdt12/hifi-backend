const AppError = require('../utils/AppError');

const globalErrorHandler = (err, req, res, next) => {
  //Log to console for dev
  console.log(err.message);
  let error = Object.create(err);

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found `;
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const keyDuplicate = Object.keys(error.keyValue);
    const values = keyDuplicate.map((key) => key);
    const message = `${values.join(
      ' ',
    )} have already existed .Please use another value!`;
    error = new AppError(message, 404);
  }

  //Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((e) => e.message);
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server error',
  });
};

module.exports = globalErrorHandler;
