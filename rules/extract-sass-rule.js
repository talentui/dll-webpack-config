const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {isProduction, publicPath} = require('../constants');

export default {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    use: [
      {
        loader: "css-loader",
        options: {
          minimize: isProduction,
          sourceMap: isProduction
        }
      },
      "sass-loader"
    ],
    publicPath
  })
}
