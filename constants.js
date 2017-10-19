const dev = "development";
const prod = "production";
const { NODE_ENV = dev, npm_package_version = '', npm_package_name = '', asset_path } = process.env;
const isProduction = NODE_ENV === prod;
const publicPath = asset_path || '';
module.exports = {
  dev,
  prod,
  NODE_ENV,
  publicPath,
  isProduction,
  npm_package_name,
  npm_package_version
}
