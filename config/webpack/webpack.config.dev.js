const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const { config, PATHS } = require("./webpack.config");

module.exports = merge(config, {
  devtool: "inline-source-map",

  entry: path.join(PATHS.src, "index.js"),

  devServer: {
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: "minimal",
    host: "0.0.0.0",
    port: 8080,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
