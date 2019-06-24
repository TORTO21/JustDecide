const Validator = require("validator");
const { validText, validNumber } = require("./manual_validations");

module.exports = function validateLoginInput(data) {
  data.password = validText(data.password) ? data.password : "";
  data.phone_number = validNumber(data.phone_number) ? data.phone_number : "";

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false }
  }
  
  if (Validator.isEmpty(data.phone_number)) {
    return { message: "A valid phone number is required (10 digits)", isValid: false }
  }

  return { message: "", isValid: true }
};