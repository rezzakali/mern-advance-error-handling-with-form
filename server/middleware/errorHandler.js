// internal imports
import ErrorResponse from '../utilities/error.js';

function errorHandler(err, req, res, next) {
  const error = { ...err };

  error.message = err.message;
  console.log(err);
  // duplicate key value error
  if (err.code === 11000) {
    const message = `Duplicate value don't allowed!`;
    error = new ErrorResponse(message, 400);
  }
  //   mongoDB || validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  // if there is no any error occured
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'There was a server side error!',
  });
  next();
}

export default errorHandler;
