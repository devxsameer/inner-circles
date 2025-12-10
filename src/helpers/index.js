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
  and: function (...args) {
    args.pop();
    return args.every(Boolean);
  },
  truncate: function (text, length) {
    if (!text) return "";

    if (text.length <= length) {
      return text;
    }

    const truncated = text.slice(0, length);
    return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
  },
};
export default hbsHelpers;
