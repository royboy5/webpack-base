const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: path.resolve(__dirname, '..', '..', 'src/index.js'),
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, '..', '..', 'dist'),
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  module: {
    rules: [
      // babel-loader
      {
        test: /\.jsx?$/,
        include: /src/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      // css / postcss loader
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname),
              },
            },
          },
        ],
      },
      // fonts
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff',
          },
        },
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../..', 'public/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
  ],
};
