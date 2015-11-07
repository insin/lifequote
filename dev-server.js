var fs = require('fs')
var path = require('path')

var express = require('express')

var PUBLIC_PATH = path.resolve(__dirname, 'public')

var app = express()

try {
  var publicBuildPath = path.resolve(PUBLIC_PATH, 'build')
  if (fs.statSync(publicBuildPath)) {
    console.log('Using static build from ' + publicBuildPath)
  }
}
catch (err) {
  console.log('Using webpack-dev-middleware')
  var webpack = require('webpack')
  var webpackConfig = require('./webpack.config')
  var webpackCompiler = webpack(webpackConfig)
  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))
  app.use(require('webpack-hot-middleware')(webpackCompiler))
}

app.use(express.static(PUBLIC_PATH))

app.listen(3000, '0.0.0.0', function(err) {
  if (err) {
    console.error('Error starting dev server:')
    console.error(err.stack)
    process.exit(1)
  }
  console.log('dev server running on http://127.0.0.1:3000')
})
