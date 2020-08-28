const path = require('path')
// 删除构建后的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 根据模版生成html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离css到单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 优化css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 优化js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/func.js',
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'dist/pulic/css',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
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
