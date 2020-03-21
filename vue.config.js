const path = require('path')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}

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
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/admin': {
        target: 'http://localhost:3000/admin',
        changeOrigin: true,
        pathRewrite: {
          '^/admin': ''
        }
      },
      '/': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        devtool: '#eval-source-map'
      }
    } else {
      return {
        devtool: '#source-map'
      }
    }
  },
  // productionSourceMap: true,
  css: {
    extract: true,
    sourceMap: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
  }
}
