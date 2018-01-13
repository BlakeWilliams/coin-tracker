const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const externals = require("./package.json").dependencies;

const config = {
  target: "electron-main",
  entry: "./src/main/index.js",
  externals: Object.keys(externals || {}),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main/index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(node_modules)/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "src/static",
        to: "static",
        force: true,
      },
    ]),
  ],
  node: {
    __dirname: false,
  },
};

module.exports = config;
