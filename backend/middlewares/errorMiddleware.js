// Not Found Error Middleware
const notfoundErrorMiddleware = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);  // Pass to the error handler
};

// General Error Handler Middleware
const errorMiddlewareHandler = (err, req, res, next) => {
  // If the error doesn't have a status code, default to 500
  const statusCode = err.statusCode || 500; 
  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,  // Hide stack trace in production
  });
};

module.exports = { errorMiddlewareHandler, notfoundErrorMiddleware };
