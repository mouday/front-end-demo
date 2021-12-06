'use strict';

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // 引入压缩插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 开发环境
  mode: process.env.NODE_ENV,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, './dist'),
    // publicPath: '/dist/',
    filename: 'js/[name].js',
    clean: true, // 在生成文件之前清空 output 目录

    // library: {
    //   name: 'moreStorage',
    //   type: 'umd',
    //   // 不添加的话引用的时候需要 libraryName.default
    //   export: 'default',
    // },
  },

  // 开发
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
  },

  module: {
    rules: [
      // js
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'postcss-loader',
          'less-loader',
          // // 引入全局变量
          // {
          //   loader: 'style-resources-loader',
          //   options: {
          //     // src/styles/variables.less
          //     patterns: ['./src/styles/variables.less'],
          //   },
          // },
        ],
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 使用压缩插件
        include: /\.min\.js$/,
      }),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
