const path = require('path')

module.exports = {
  entry: {
    App: './app/assets/js/App.js',
  },
  output: {
    path: path.resolve(__dirname, 'app/assets/js'),
    filename: 'scripts-bundled.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread'],
        },
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
}
