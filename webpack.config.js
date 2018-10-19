const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')

const isProduction = process.env.NODE_ENV === 'production'

config = {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: {
        app: "./resources/angular/app/admin/config/main",
        client: "./resources/angular/app/client/config/main",
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
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        publicPath: '/assets',
        hot: true,
        port: 3080,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
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
                    system: true
                }
            },
            // Typescript
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: { configFileName: path.join(__dirname, 'tsconfig.json') }
                    } , 'angular2-template-loader'
                ]
            },
            // index file
            {
                test: /index.html$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CheckerPlugin(),
    ]
}

if (!isProduction) {
    config.module.rules.unshift({
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
            loader: 'tslint-loader',
        },
    })
}

module.exports = config
