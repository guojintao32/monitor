const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
console.log(process.env.NODE_ENV)
module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname,'./dist')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },{
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },{
        test: /\.(woff2|woff|ttf|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]-[hash:5].min.[ext]",
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: "fonts/",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "vue_stage",
      template: path.resolve(__dirname,'./client/build/index.html'),
      favicon: path.resolve(__dirname,'./client/build/favicon.ico'),
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV) })
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback:{
      rewrites: [
        { from: /^\/$/, to: '/dist/index.html' }
      ]
    },
    proxy:{
      '/api': {
        target: process.env.NODE_ENV=== 'development' ? 'http://localhost:8081' : 'http://47.98.118.170:8081',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,
      }
    }
  }
} 