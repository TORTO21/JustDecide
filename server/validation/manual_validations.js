const validText = str => {
  return typeof str === "string" && str.trim().length > 0;
};

const validNumber = num => {
  return typeof num === "number" && num.length === 10;
};

module.exports = { validText, validNumber };