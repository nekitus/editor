const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { NODE_ENV, ENV = NODE_ENV, DEBUG = true } = process.env;

const PATHS = {
  src: path.resolve(__dirname, "../../src/"),
  build: path.resolve(__dirname, "../../build/"),
  node_modules: path.resolve(__dirname, "../../node_modules/"),
};

const filesHashType = NODE_ENV === "production" ? "contenthash" : "hash:8";

const config = {
  context: PATHS.src,

  mode: NODE_ENV,

  output: {
    path: PATHS.build,
    publicPath: "/",
    filename: `js/[name].[${filesHashType}].js`,
    chunkFilename: `js/chunks/chunk.[id].[${filesHashType}].js`,
  },

  resolve: {
    modules: [PATHS.src, "node_modules"],
    extensions: [".js", ".jsx"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, "../../babel.config.js"),
        },
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
        ],
      },
      {
        test: /\.(jpg|jpe?g|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 4000,
              name: "images/[path][name].[hash:8].[ext]",
            },
          },
          "image-webpack-loader",
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[path][name].[hash:8].[ext]",
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "demo app",
      template: path.join(PATHS.src, "resources/templates/index.ejs"),
      filename: path.join(PATHS.build, "index.html"),
      chunksSortMode: "none",
    }),

    new MiniCssExtractPlugin({
      filename: `styles/[name].[${filesHashType}].css`,
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV),
        ENV: JSON.stringify(ENV),
      },
    }),
  ],
};

module.exports = {
  NODE_ENV,
  PATHS,
  config,
};
