const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', 'css', 'scss'],
        modules: [
            path.resolve(__dirname, 'Content'),
            path.resolve(__dirname, 'Scripts'),
            'node_modules'
        ]
    },
    entry: {
        index: './Scripts/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'wwwroot/js')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            cacheGroups: {
                vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            { 
                test: /\.tsx?$/, 
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '../css/[name].css' }),
        new BundleAnalyzerPlugin({ analyzerMode: 'disabled' /* 'static' */ })
    ]
};