const {isProduction} = require('../constants');
module.exports = {
  test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
  loader: "file-loader",
  options: {
    name: isProduction ? "images/[name]-[hash].[ext]" : "images/[name].[ext]"
  }
}