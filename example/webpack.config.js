const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('../webpack.config');

module.exports = Object.assign({}, config, {
  entry: path.join(__dirname, 'example.js'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  output: {
    path: __dirname + '/dist',
    filename: 'example-bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'template.html'),
    }),
  ],
});
