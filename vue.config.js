/**
 * 优化webpack
 * @author Jalon
 * @CreateTime 2019/07/10
 * */
const webpack = require('webpack')
// const HappyPack = require('happypack');
// const os = require('os');
// const happyThreadPool = HappyPack.ThreadPool({
//     size: os.cpus().length
// });
const TerserPlugin = require('terser-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')

const dllReference = (config) => {
  config.plugin('vendorDll')
    .use(webpack.DllReferencePlugin, [{
      context: __dirname,
      manifest: require('./dll/vendor.manifest.json')
    }])

  config.plugin('utilDll')
    .use(webpack.DllReferencePlugin, [{
      context: __dirname,
      manifest: require('./dll/util.manifest.json')
    }])

  config.plugin('addAssetHtml')
    .use(AddAssetHtmlPlugin, [
      [{
        filepath: require.resolve(path.resolve(__dirname, './dll/vendor.dll.js')),
        outputPath: 'dll',
        publicPath: '/dll'
      },
      {
        filepath: require.resolve(path.resolve(__dirname, './dll/util.dll.js')),
        outputPath: 'dll',
        publicPath: '/dll'
      }
      ]
    ])
    .after('html')
}

module.exports = {
  publicPath: './',
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  },
  productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      dllReference(config)
    }
  },
  configureWebpack: {
    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
    //         loader: 'happypack/loader?id=happyBabel',
    //         //排除node_modules 目录下的文件
    //         exclude: path.resolve(__dirname, 'node_modules'),
    //     }, ],

    // },
    // plugins: [
    //     new HappyPack({
    //         //用id来标识 happypack处理那里类文件
    //         id: 'happyBabel',
    //         //如何处理  用法和loader 的配置一样
    //         loaders: [{
    //             loader: 'babel-loader?cacheDirectory=true',
    //         }],
    //         //共享进程池
    //         threadPool: happyThreadPool,
    //     }),
    // ],
    // 缩小你的JavaScript 生产环境删除console.log。
    optimization: {
      minimizer: [
        new TerserPlugin({
          // pure_funcs: ['console.log'],
          cache: true, // 开启文件缓存
          parallel: true // 开启并发 也也可以指定并发数
        })
      ]
    }

  }

}
