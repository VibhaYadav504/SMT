const errorHandler = (err, req, res, next) => {
  console.error("ERROR =>", err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    stack: err.stack,
  });
};

export default errorHandler;