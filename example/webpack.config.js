const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'example.js'),
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              [
                '@babel/preset-env',
                {
                  modules: false,
                  debug: false,
                  targets: {
                    browsers: ['>0.25%'],
                  },
                },
              ],
            ],
          },
        },
      },
    ],
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
};
