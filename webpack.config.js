const path = require("path");
const webpack = require("webpack");
const dev = "development";
const prod = "production";
const afterFix = ".dev";
const emptyStr = "";
const { NODE_ENV = dev, npm_package_version, npm_package_name } = process.env;
const isProduction = NODE_ENV === prod;
const version = npm_package_version.split(".").join("");
const outputFileName = npm_package_name.indexOf("@") === -1
    ? npm_package_name
    : npm_package_name.split("/")[1];
const outputVarName = outputFileName.split("-").join("_");

/**
 * @options
 * root: 项目根目录
 * venders: vender列表
 */

module.exports = options => {

    const targetDir = path.resolve(options.root, "lib/");

    const plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(isProduction ? prod : dev)
            }
        }),
        new webpack.DllPlugin({
            path: path.join(
                targetDir,
                `${outputFileName}.manifest.${version}${isProduction
                    ? emptyStr
                    : afterFix}.json`
            ),
            name: "[name]",
            context: __dirname
        })
    ];

    if (isProduction) plugins.push(new webpack.optimize.UglifyJsPlugin());
    else plugins.push(new webpack.NamedModulesPlugin());

    return {
        entry: {
            [outputVarName]: options.venders
        },
        output: {
            path: path.join(targetDir),
            filename: `${outputFileName}.${version}${isProduction
                ? emptyStr
                : afterFix}.js`,
            library: "[name]"
        },
        plugins: plugins,
        resolve: {
            modules: [path.resolve(__dirname), "node_modules"]
        }
    };
};
