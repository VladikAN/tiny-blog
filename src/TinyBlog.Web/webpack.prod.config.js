const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    stats: {
        all: false,
        modules: true,
        maxModules: 0,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({ parallel: true }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
});