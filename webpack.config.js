import webpack from 'webpack'
import path from 'path'
import TerserJSPlugin from 'terser-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'
import { AngularWebpackPlugin } from '@ngtools/webpack'
import ESLintPlugin from 'eslint-webpack-plugin'
import linkerPlugin from '@angular/compiler-cli/linker/babel'
import { fileURLToPath } from 'url'
import WebpackHotFilePlugin from './webpack.hot-file.plugin.js'
import 'dotenv/config'

const isProduction = process.env.NODE_ENV === 'production'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config = {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: './resources/angular/app/client/config/main',
        "app-styles": './resources/assets/sass/client/styles.scss',
        polyfills: './resources/angular/app/polyfills.ts',
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: isProduction ? '[name]-[fullhash].js' : '[name].js',
        chunkFilename: isProduction ? '[name]-[fullhash].js' : '[name].js',
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
        minimizer: [new TerserJSPlugin()],
    },
    devServer: {
        devMiddleware: {
            publicPath: '/assets',
        },
        static: {
            directory: path.join(__dirname, 'public'),
        },
        host: 'localhost',
        hot: true,
        port: 3080,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        allowedHosts: 'all',
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
                    {
                        loader: 'sass-loader',
                        options: {
                            api: "modern",
                            sassOptions: {
                                silenceDeprecations: ["import", "color-functions"],
                            },
                        },
                    },
                ],
                exclude: path.join(__dirname, 'resources/angular'),
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
            {
                test: /\.[cm]?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        compact: false,
                        plugins: [linkerPlugin],
                    },
                },
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

export default config
