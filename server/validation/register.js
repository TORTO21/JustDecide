const Validator = require("validator");
const { validText, validNumber } = require("./manual_validations");

module.exports = function validateRegisterInput(data) {
  data.password = validText(data.password) ? data.password : "";
  data.phone_number = validNumber(data.phone_number) ? data.phone_number : ""

  if (Validator.isEmpty(data.phone_number)) {
    return { message: "A valid phone number is required (10 digits)", isValid: false }
  }

  //doesn't hit anymore because of validNumber(), but left in
  if (!Validator.isNumeric(data.phone_number)) {
    return { message: "Phone number must be numbers only", isValid: false }
  }

  if (!Validator.isLength(data.password, {min: 6, max: 32})) {
    return { message: "Password length must be between 6 and 32 characters", isValid: false }
  }

  return { message: "", isValid: true }
};