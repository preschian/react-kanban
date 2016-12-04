var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.join(__dirname, 'build/jsx')
var DIST_DIR = path.join(__dirname, 'dist/assets/js')

var config = {
  devtool: 'cheap-module-source-map',
  entry: BUILD_DIR + '/script.jsx',
  output: {
    path: DIST_DIR,
    filename: 'script.jsx'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      include: BUILD_DIR,
      loader: 'babel'
    }]
  }
}

module.exports = config
