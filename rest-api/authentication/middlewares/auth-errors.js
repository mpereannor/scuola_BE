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

const serverError = (err, req, res, next) => {
  if (!err.status) {
    console.error(err.stack);
  }
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
};
module.exports = { BadRequest, Unauthorized, notFound, serverError };
