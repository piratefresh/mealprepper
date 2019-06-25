const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled HtmlWebpackPlugin for you! This generates a html
 * page for you when you compile webpack, which will make you start
 * developing and prototyping faster.
 *
 * https://github.com/jantimon/html-webpack-plugin
 *
 */

//  Defines the root location
const root = `${__dirname}/src`;

// Defines the styles location
const styles= `${root}/styles`;

module.exports = {
	mode: 'development',
	entry: `${root}/app/root.module.js`,
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	  },
	plugins: [new webpack.ProgressPlugin(),   new HtmlWebpackPlugin({
		template: 'src/index.html',
		inject: 'body',
	})],

	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'ngtemplate-loader',
						options: {
								relativeTo: path.resolve(__dirname, './src/app'),
						}
				},
					{ loader: 'html-loader', options: { minimize: true } }],
					exclude: /index\.html/
			},
			{
				test: /.(js|jsx)$/,
				include: [path.resolve(__dirname, 'src')],
				exclude: /node_modules/,
				use: ['babel-loader', 'auto-ngtemplate-loader'],
			},
			{
				test: /\.scss$/,
				use: [{
						loader: "style-loader"
				}, {
						loader: "css-loader"
				}, {
						loader: "sass-loader",
						options: {
								includePaths: [styles]
						}
				}]
		},
			  {
				test: /\.(png|jpg|gif|eot|woff|woff2|svg|ttf)$/,
				use: 'file-loader'
			  },
			  {
				test: /\.png$/,
				use: [
				  {
					loader: 'url-loader',
					options: {
					  mimetype: 'image/png'
					}
				  }
				]
			  }
		]
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		open: true
	}
};
