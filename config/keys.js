const { NODE_ENV = "development" } = process.env;

//constants
// const ONE_HOUR = 1000 * 60 * 60

//bcrypt
const BCRYPT_WORK_FACTOR = 12;
const BCRYPT_MAX_BYTES = 72;

//verification email
/*
const EMAIL_VERIFICATION_TIMEOUT = ONE_HOUR * 12
const EMAIL_VERIFICATION_TOKEN_BYTES = 40
const EMAIL_VERIFICATION_SIGNATURE_BYTES = 64
*/

//password reset
/*
const PASSWORD_RESET_BYTES = 40
const PASSWORD_RESET_TIMEOUT = ONE_HOUR
*/

module.exports = {
  IN_PROD: NODE_ENV === "production",
  TESTING: NODE_ENV === "testing",
  BCRYPT_WORK_FACTOR,
  BCRYPT_MAX_BYTES,
  //     EMAIL_VERIFICATION_TOKEN_BYTES,
  //     EMAIL_VERIFICATION_TIMEOUT,
  //     EMAIL_VERIFICATION_SIGNATURE_BYTES,
  //     PASSWORD_RESET_BYTES,
  //     PASSWORD_RESET_TIMEOUT
  //
};
