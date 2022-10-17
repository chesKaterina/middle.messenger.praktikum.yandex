const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: "development",
  entry: ['./index.ts', './static/js/script.js', './src/main.css'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/bundle.[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', 'json'],
  },
  devServer: {
    static: './dist',
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.ts$/i,
        loader: 'ts-loader',
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "assets/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "assets/resource",
      },
      ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: './src/main.css',
    })
  ]
}
