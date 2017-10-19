const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {isProduction, publicPath} = require('../constants');

module.exports = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
      use: {
          loader: "css-loader",
          options: {
              minimize: isProduction,
              sourceMap: isProduction
          }
      },
      publicPath
  })
}