function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
}

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  console.error(error.message);
  const status = error.statusCode || 500;
  res.status(status).json({ error: status === 500 ? 'Something went wrong on the server.' : error.message });
}

module.exports = { notFound, errorHandler };
