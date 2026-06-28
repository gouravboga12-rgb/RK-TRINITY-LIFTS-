const errorHandler = (err, req, res, next) => {
  console.error('SERVER ERROR LOG:', err);

  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error.',
    errors: err.errors || []
  });
};

module.exports = errorHandler;
