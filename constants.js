const dev = "development";
const prod = "production";
const { NODE_ENV = dev, asset_path } = process.env;
const isProduction = NODE_ENV === prod;
const publicPath = asset_path || '';
module.exports = {
    dev,
    prod,
    publicPath,
    isProduction,
}
