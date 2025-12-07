// src/helpers/index.js
const hbsHelpers = {
  uppercase: (str) => String(str || "").toUpperCase(),
  eq: (a, b) => a === b,

  ifEqual: function (a, b, options) {
    if (String(a) === String(b)) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
  isSelected: function (a, b) {
    return String(a) === String(b) ? "selected" : "";
  },
  equals: function (a, b) {
    return a === b;
  },
  or: function (a, b) {
    return a || b;
  },
};
export default hbsHelpers;
