const validText = str => {
  return (typeof str === "string" && str.trim().length > 0);
};

const validNumber = numString => {
  return (numString * 1 && numString.length === 10);
};

module.exports = { validText, validNumber };