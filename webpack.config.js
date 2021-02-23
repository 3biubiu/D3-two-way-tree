var path = require('path')
var webpack = require('webpack')
module.exports = {	
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			}, 
			{
				test: /\.less$/i,
				use: [
					'vue-style-loader',
					'css-loader',
                    'less-loader',
				],
            }
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'src')
		},
		extensions: ['*', '.js', '.vue', '.json','less']
	},
	devServer: { //通过配置devserver选项，可以开启一个本地服务器
		historyApiFallback: true,  //不跳转
		noInfo: true,
		overlay: true
	},
	performance: { //打包后命令行如何展示性能提示，如果超过某个大小是警告还是报错
		hints: false
	},
	devtool: '#eval-source-map'
}

if (NODE_ENV === 'production') {
  	module.exports.devtool = '#source-map'
  	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
  	])
}
