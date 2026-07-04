const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'nosources-source-map',
    stats: {
        all: false,
        modules: true,
        errors: true,
        warnings: true,
        moduleTrace: true,
        errorDetails: true
    },
    optimization: {
        minimizer: [
            new TerserPlugin({ parallel: false }),
            new CssMinimizerPlugin()
        ]
    }
});
