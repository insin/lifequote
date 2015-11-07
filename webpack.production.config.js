process.env.NODE_ENV = 'production'

var path = require('path')

var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

function failBuildOnCompilationErrors() {
  this.plugin('done', function(stats) {
    if (stats.compilation.errors && stats.compilation.errors.length > 0) {
      console.error('webpack build failed:')
      stats.compilation.errors.forEach(function(error) {
        console.error(error.message)
      })
      process.exit(1)
    }
  })
}

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  plugins: [
    failBuildOnCompilationErrors,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    // Move anything imported from node_modules into a vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: function(module, count) {
        return (
          module.resource &&
          module.resource.indexOf(path.resolve(__dirname, 'node_modules')) === 0 &&
          /\.js$/.test(module.resource)
        )
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?-minimize')},
      {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'file?name=[name].[ext]'}
    ]
  }
}
