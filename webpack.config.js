const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const helpers = require('./webpack.helpers')
const TerserJSPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally')

const isProduction = process.env.NODE_ENV === 'production'

config = {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: [
            './resources/angular/app/admin/config/main',
            './resources/assets/sass/admin/styles.scss',
        ],
        client: [
            './resources/angular/app/client/config/main',
            './resources/assets/sass/client/styles.scss',
        ],
        public: './resources/assets/sass/frontend/styles.scss',
    },
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
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
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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
            new TsConfigPathsPlugin({
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
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.join(__dirname, 'tsconfig.json') }
                    },
                    'angular2-template-loader',
                ],
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
                use: ['to-string-loader', 'css-loader'],
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
        ],
    },
    plugins: [
        new CheckerPlugin(),
        // Workaround for Critical dependency
        // The request of a dependency is an expression in ./node_modules/@angular/core/fesm5/core.js
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            helpers.root('./resources/angular/app'),
            {}
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            allChunks: true,
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
                'public.bundle.js': code => require('uglify-js').minify(code).code,
            },
        }),
    ],
}

if (!isProduction) {
    config.module.rules.unshift({
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
            loader: 'tslint-loader',
            options: {
                tsConfigFile: './tslint.json',
            },
        },
    })
}

module.exports = config
