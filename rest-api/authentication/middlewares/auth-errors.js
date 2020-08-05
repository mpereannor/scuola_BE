//custom Errors
class BadRequest extends Error {
  constructor(message = "Bad Request") {
    super(message);

    this.status = 400;
  }
}

class Unauthorized extends Error {
  constructor(message = "Unauthorized") {
    super(message);

    this.status = 401;
  }
}

//errors
const notFound = (req, res) => {
  res.status(404).json({ message: "Not Found" });
};

const serverError = (error, req, res, next) => {
  if (!error.status) {
    console.error(error.stack);
  }
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
};
module.exports = { BadRequest, Unauthorized, notFound, serverError };
