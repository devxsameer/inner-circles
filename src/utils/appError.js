// src/utils/appError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    // Capture the stack trace, excluding this constructor from it
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
