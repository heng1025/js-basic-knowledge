const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: path.resolve(__dirname, "dist"),
  mode: "development",
};
