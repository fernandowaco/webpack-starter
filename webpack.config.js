/*
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/* prettier-ignore */
module.exports = {

  mode: 'development',
  optimization:{
      minimizer: [new OptimizeCssAssetsWebpackPlugin()]
  },

  module: {
    rules: [
        {
            test: /\.css$/i,
            exclude: /styles\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ],  
        },
            
        {
            test: /styles\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
              'css-loader'
            ],  
        },
      
        {
            test: /\.html$/i,
            loader: 'html-loader',
            options: {
              // Disables attributes processing
              attributes: false,
              minimize: false,
              
            }, 
        },

        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                      esModule: false,
                },
              },
            ],
        }
    ],
  },
  
  plugins: [
      new HtmlWebpackPlugin({
          filename: './index.html',
          template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        ignoreOrder: false
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets/' },
          
        ],
      }),
      new CleanWebpackPlugin(),
  ]

};
