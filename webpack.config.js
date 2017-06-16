const path = require("path");
const webpack = require("webpack");
const dev = "development";
const prod = "production";
const { NODE_ENV = dev, npm_package_version, npm_package_name } = process.env;
const isProduction = NODE_ENV === prod;
const {
    manifest,
    filename
} = require("@beisen/talent-ui-dll-naming-convention")(
    npm_package_name,
    npm_package_version,
    isProduction
);

//变量名称中不能有减号，所以把-号换成下划线
const outputVarName = filename.indexOf("-") === -1
    ? filename
    : filename.split(/-|\./).join("_");

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
                manifest
            ),
            name: "[name]",
            context: options.root
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
            filename,
            library: "[name]"
        },
        plugins: plugins,
        resolve: {
            modules: [path.resolve(options.root, "node_modules/")],
            alias: options.alias || {}
        }
    };
};
