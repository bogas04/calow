const { name } = require("./package.json");

module.exports = {
  basePath: process.env.NODE_ENV === "production" ? `/${name}` : undefined,
};
