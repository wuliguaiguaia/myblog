module.exports = {
	//   publicPath: process.env.NODE_ENV === 'production'
	//     ? '/'
	//     : '/',
	lintOnSave: true,
	devServer: {
		open: false, // 是否打开浏览器
		host: '0.0.0.0',
		https: false,
		hotOnly: true, // 热更新
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		}
	},
	configureWebpack: () => {
		if (process.env.NODE_ENV === 'production') {
			return {
				devtool: '#eval-source-map'
			};
		} else {
			return {
				devtool: '#source-map'
			};
		}
	},
	css: {
		extract: true,
		sourceMap: true
	},
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
		types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)));
	}
};

function addStyleResource (rule) {
	const prefix = './node_modules/z-wheel-0201/lib/styles/';
	rule.use('style-resource')
		.loader('style-resources-loader')
		.options({
			patterns: [
				prefix + 'common/var.scss',
				prefix + 'common/transition.scss', // ps: transition引入无效果，
				prefix + 'common/animation.scss'
			],
		});
}
