function text(value, field, max = 5000) {
  if (typeof value !== 'string' || !value.trim()) {
    const error = new Error(`${field} is required.`);
    error.statusCode = 400;
    throw error;
  }
  if (value.length > max) {
    const error = new Error(`${field} is too long.`);
    error.statusCode = 400;
    throw error;
  }
  return value.trim();
}

function number(value, field, min, max) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    const error = new Error(`${field} must be between ${min} and ${max}.`);
    error.statusCode = 400;
    throw error;
  }
  return parsed;
}

module.exports = { text, number };
