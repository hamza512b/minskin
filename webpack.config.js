

const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {
    let devtool, mode, stats;
    if (env.production !== undefined && env.production === true) {
        devtool = 'hidden-source-map';
        mode = 'production';
        stats = 'none';
    } else {
        devtool = 'eval';
        mode = 'development';
        stats = 'minimal';
    }
    return {
        devtool,
        mode,
        stats,
        module: {
            rules: [
                // JavaScript
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                "@babel/plugin-transform-runtime"
                            ]
                        }
                    }],
                },
                // Scss
                {
                    test: /\.s[ac]ss$/i,
                    include: path.resolve(__dirname, 'src'),
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ],
                },
                // Files
                {
                    exclude: /node_modules/,
                    test: /\.(png|jpe?g|gltf)$/i,
                    loader: 'file-loader',
                    options: {
                        name: "[name].[ext]"
                    }
                }
            ],
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        entry: [
            path.resolve(__dirname, './src/index.js'),
        ],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].bundle.js'
        },
        plugins: [
            new CopyPlugin({
                patterns: [{ from: "public", to: "./" }]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "./src/index.html"),
                filename: 'index.html'
            }),
            new BrowserSyncPlugin({
                host: "localhost",
                port: 3000,
                server: {
                    baseDir: [path.resolve(__dirname, './dist')],
                    open: true
                },
                notify: false
            }),
            new CleanWebpackPlugin({
                cleanStaleWebpackAssets: false
            }),
            new MiniCssExtractPlugin()
        ]
    }
};