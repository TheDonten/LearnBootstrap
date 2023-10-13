const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

let mode = 'development';
if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    mode : mode,
    plugins: [
        new MiniCssExtractPlugin({
            filename : '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
        template: "./src/index.html"
    })],
    devServer: {
        static: './dist',
    },
    
    module: {
        rules: [
            
            {
              test : /\.(sa|sc|c)ss$/,
              use : [
                  (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
                  "css-loader",
                  {
                      loader : "postcss-loader",
                      options : {
                          postcssOptions : {
                              plugins: [
                                  [
                                      "postcss-preset-env",
                                      {

                                      }
                                  ]
                              ]
                          }
                      }
                  },
                  "sass-loader",
              ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: 'img'
                }
              },
        
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '/',
    },
}
