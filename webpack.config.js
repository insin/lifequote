process.env.NODE_ENV = 'development'

var path = require('path')

var webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    // Polyfill EventSource for IE, as webpack-hot-middleware/client uses it
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css?-minimize'},
      {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=10240'}
    ]
  }
}
