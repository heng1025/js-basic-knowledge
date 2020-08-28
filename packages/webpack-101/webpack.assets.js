const path = require('path')
// 根据模版生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css到单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 优化css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 优化js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.[hash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  devServer: {
    port: 8000,
    progress: true,
    contentBase: './dist',
    compress: true,
  },
}
