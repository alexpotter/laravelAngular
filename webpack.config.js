const webpack = require('webpack');
const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const Uglify = require('uglify-js')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const WebpackHotFilePlugin = require('./webpack.hot-file.plugin')
const { AngularWebpackPlugin } = require('@ngtools/webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

config = {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './resources/angular/app/admin/config/main',
        client: './resources/angular/app/client/config/main',
        "app-styles": './resources/assets/sass/admin/styles.scss',
        "client-styles": './resources/assets/sass/client/styles.scss',
        "public-styles": './resources/assets/sass/frontend/styles.scss',
        "font-awesome": './resources/assets/sass/font-awesome.scss',
        polyfills: './resources/angular/app/polyfills.ts',
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: isProduction ? '[name]-[hash].js' : '[name].js',
        chunkFilename: isProduction ? '[name]-[hash].js' : '[name].js',
        publicPath: isProduction ? '/assets/' : 'http://localhost:3080/assets/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
        runtimeChunk: {
            name: 'manifest',
        },
        minimizer: [new TerserJSPlugin({})],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/assets',
        hot: true,
        port: 3080,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        disableHostCheck: true,
    },
    resolve: {
        extensions: ['.ts', '.js', 'html'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /.js$/,
                parser: {
                    system: true,
                },
            },
            {
                test: /\.ts$/,
                use: '@ngtools/webpack',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                    removeComments: false,
                    collapseWhitespace: false,
                    removeAttributeQuotes: false,
                },
            },
            {
                test: /\.css$/,
                loader: 'raw-loader',
                include: path.join(__dirname, 'resources/angular'),

            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader',
                ],
                exclude: path.join(__dirname, 'resources/angular'),
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new AngularWebpackPlugin({
            tsconfig:  path.join(__dirname, 'tsconfig.json'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new MergeIntoSingleFilePlugin({
            files: {
                'public.bundle.js': [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jquery-colorbox/jquery.colorbox.js',
                    'node_modules/smooth-scroll/dist/js/smooth-scroll.js',
                    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
                    'resources/assets/js/justified-gallery.js',
                    'resources/assets/js/frontend.js',
                ],
            },
            transform: {
                'public.bundle.js': code => Uglify.minify(code).code,
            },
        }),
        new WebpackManifestPlugin({
            basePath: '/assets/'
        }),
        new WebpackHotFilePlugin({
            disabled: isProduction,
            host: 'http://localhost:3080',
        }),
    ],
}

if (!isProduction) {
    config.plugins.unshift(new ESLintPlugin({
        extensions: 'ts',
    }))
}

module.exports = config
