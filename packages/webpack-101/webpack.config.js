const path = require("path");

module.exports = {
  entry: "./src/base.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
