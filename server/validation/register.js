const Validator = require("validator");
const { validText, validNumber } = require("./manual_validations");

module.exports = function validateRegisterInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.name = validText(data.name) ? data.name : "";
  data.password = validText(data.password) ? data.password : "";
  data.phone_number = validNumber(data.phone_number) ? data.phone_number : ""

  // if (data.email && !Validator.isEmail(data.email)) {
  //   return { message: "Email is invalid", isValid: false }
  // }

  // if (Validator.isEmpty(data.email)) {
  //   return { message: "Email field is required", isValid: false }
  // }

  // if (Validator.isEmpty(data.name)) {
  //   return { message: "Name field is required", isValid: false }
  // }

  console.log(data)

  if (Validator.isEmpty(data.phone_number)) {
    return { message: "Phone number is required", isValid: false }
  }

  if (!Validator.isNumeric(data.phone_number)) {
    return { message: "Phone number must be numbers only", isValid: false }
  }

  if (!Validator.isLength(data.password, {min: 6, max: 32})) {
    return { message: "Password length must be between 8 and 32 characters", isValid: false }
  }

  return { message: "", isValid: true }
};