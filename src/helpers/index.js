// src/helpers/index.js
const hbsHelpers = {
  uppercase: (str) => String(str || "").toUpperCase(),
  eq: (a, b) => a === b,
};
export default hbsHelpers;
