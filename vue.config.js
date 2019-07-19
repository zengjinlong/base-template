/**
 * 优化webpack
 * @author Jalon
 * @CreateTime 2019/07/11
 *
 * */
const webpack = require('webpack')
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
    plugins: [

    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve('src'),
          use: [
            'thread-loader',
            'babel-loader'
          ]

        }
      ]
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true, // 开启文件缓存
          parallel: true // 开启并发 也也可以指定并发数
        }),
        new OptimizeCSSAssetsPlugin({ // 压缩css
          cssProcessorOptions: {
            safe: true
          }
        })
      ],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true
          }
        }
      }
    }

  }

}
