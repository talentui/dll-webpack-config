module.exports = new (require('uglifyjs-webpack-plugin'))({
    uglifyOptions: {
        // ie8: true,
        ecma: 5,
        compress: {
            drop_console: true
        }
    },
    sourceMap: true,
    parallel: true
});
