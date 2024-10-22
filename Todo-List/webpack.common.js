const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),

  plugins: [
    new HtmlWebpackPlugin({
      title: "TOP Todo List",
      template: "./src/index.html",
    }),
  ],

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ],
  },
};
