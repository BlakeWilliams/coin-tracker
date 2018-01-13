const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  target: "electron-renderer",
  entry: {
    menu: "./src/renderer/menu/index.js",
    settings: "./src/renderer/settings/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build/renderer"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/renderer/styles"],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["menu"],
      filename: "menu.html",
      template: "src/renderer/template.html",
    }),
    new HtmlWebpackPlugin({
      chunks: ["settings"],
      filename: "settings.html",
      template: "src/renderer/template.html",
    }),
  ],
  resolve: {
    alias: {
      static: path.resolve(__dirname, "src/static/"),
    },
  },
};

module.exports = config;
