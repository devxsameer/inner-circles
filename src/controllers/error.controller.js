// src/controllers/error.controller.js

// development
const sendErrorDev = (err, res) => {
  console.error("ERROR 💥:", err);

  return res.status(err.statusCode).render("error_dev", {
    title: "Something went wrong!",
    message: err.message,
    stack: err.stack,
  });
};

// production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      // Use 'error.ejs'
      title: "Something went wrong!",
      message: err.message,
    });
  }

  console.error("ERROR 💥:", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    message: "Please try again later.",
  });
};

export default function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
}
