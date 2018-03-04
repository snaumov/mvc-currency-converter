const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './widget/index.js',
    output: {
        path: __dirname + "/docs",
        filename: 'widget.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{from: './index.html', to: './index.html'}])
    ]
};