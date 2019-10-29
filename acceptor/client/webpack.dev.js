const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
      template: path.resolve(__dirname,'./index.html')
    }),
    new VueLoaderPlugin()
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
        target: `http://localhost:8081`,
        pathRewrite: {"^/api" : ""}
      }
    }
  }
} 