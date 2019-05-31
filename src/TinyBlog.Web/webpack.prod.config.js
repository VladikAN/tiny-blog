const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    optimization: {
        minimizer: [
            new TerserJSPlugin({ parallel: true }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});