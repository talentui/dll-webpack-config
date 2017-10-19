const path = require("path");
const webpack = require("webpack");
const {dev, prod, isProduction} = require('./constants')
const {
    npm_package_version = "",
    npm_package_name = ""
} = process.env;
const { manifest, filename } = require("@talentui/dll-naming")(
    npm_package_name,
    npm_package_version,
    isProduction
);

//变量名称中不能有减号，所以把-号换成下划线
const outputVarName = npm_package_name.split(/@|\/|\-|\./).join("_");

const DllParser = require("@talentui/dll-parser");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
/**
 * @options
 * root: 项目根目录
 * venders: vender列表
 */

module.exports = (options = {}) => {
    const targetDir = path.resolve(options.root, "dist/");
    let plugins = [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(isProduction ? prod : dev)
            }
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            path: path.join(targetDir, manifest),
            name: "[name]",
            context: options.root
        })
    ];
    //DllReferencePlugins
    const dllReferencePlugins = new DllParser(
        options.dllList,
        isProduction
    ).getRefPlugin(options.root);
    // new DllParser(options.dllList, isProduction)

    plugins = plugins.concat(dllReferencePlugins);

    if (isProduction) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true
            })
        );
    }
    // else plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(
      new ExtractTextPlugin({
        filename: isProduction ? "css/[name]-[hash].min.css" : "css/[name].css",
        disable: !isProduction,
        allChunks: true
      })
    );
    return {
        entry: {
            [outputVarName]: options.venders
        },
        output: {
            path: path.join(targetDir),
            filename,
            library: "[name]"
        },
        module:{
          rules:require('./rules')
        },
        plugins: plugins,
        resolve: {
            modules: [path.resolve(options.root, "node_modules/")],
            alias: options.alias || {}
        },
        devtool: isProduction ? "cheap-source-map" : false
    };
};
