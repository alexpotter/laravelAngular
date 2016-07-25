var webpack = require("webpack");
var path = require('path');

module.exports = {
	entry: {
		"app": "./public/app/boot"
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].bundle.js'
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	module: {
		loaders: [
			{
				test: /\.ts/,
				loaders: ['ts-loader'],
				exclude: [/node_modules/, /vendor/]
			}
		]
	}
}