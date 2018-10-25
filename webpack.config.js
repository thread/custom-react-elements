const path = require('path');

module.exports = {
  entry: {
    'custom-react-elements': path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CustomReactElements',
    libraryTarget: 'umd',
    sourceMapFilename: '[file].map',
  },
  plugins: [],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
