const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // Require  html-webpack-plugin plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    path: path.join(__dirname, 'public'), // Folder to store generated bundle
    filename: './js/[name].bundle.js', // Name of generated bundle after build
    publicPath: '/'
  },
  module: {
    rules: [
      // babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      // html-loader
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      // pug loader
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      // css / stylus loader
      {
        test: /\.(css|styl)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'stylus-loader' }]
        })
      },
      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: './imgs/' }
          }
        ]
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: './fonts/' }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      filename: 'something.html',
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'views/index.pug')
    }),
    new ExtractTextPlugin('./css/style.css')
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    stats: 'errors-only',
    open: true,
    port: 5000,
    compress: true
  },
  devtool: 'inline-source-map'
}

module.exports = config
