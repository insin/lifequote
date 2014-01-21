var path = require('path')

var express = require('express')

var app = express()

app.use(express.logger())
app.use(express.json())
app.use(app.router)
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.errorHandler({dumpExceptions: true, showStack: true }))

// I went to the www-proxy and all I got was this 407 ಠ_ಠ
//
// var HTTP_PROXY = ''
//   , REAL_API = ''
//
// var request = require('request')
//   , proxyRequest = request.defaults({
//       proxy: PROXY
//     })
//
// app.use('/api', function(req, res) {
//   req
//     .pipe(proxyRequest(REAL_API + req.originalUrl))
//     .pipe(res)
// })

// Test API Implementation -----------------------------------------------------

var uuid = require('uuid')

function extend(dest) {
  for (var i = 1, l = arguments.length; i < l; i++) {
    var src = arguments[i]
    for (var prop in src) {
      dest[prop] = src[prop]
    }
  }
  return dest
}

var leads = {}
  , quotes = {}

app.post('/api/lead', function(req, res) {
  var lead = {id: uuid.v4()}
  leads[lead.id] = lead
  res.json(201, lead)
})

app.put('/api/lead', function(req, res) {
  if (!('id' in req.body && req.body.id in leads)) return res.send(400)

  var lead = extend(leads[req.body.id], req.body)
  res.set('Location', 'http://127.0.0.1:3000/api/lead/' + lead.id)
  res.json(202, req.body)
})

app.get('/api/lead', function(req, res) {
  res.json(Object.keys(leads))
})

app.get('/api/lead/:id', function(req, res) {
  if (!(req.params.id in leads)) return res.send(404)
  res.json(leads[req.params.id])
})

var quoteCodes = ['stateCode', 'productCode', 'healthCode']

app.post('/api/quote', function(req, res) {
  for (var i = 0, l = quoteCodes.length; i < l; i++) {
    var prop = quoteCodes[i]
    if (!(prop in req.body)) {
      return res.json(400, {error: 'Missing ' + prop})
    }

    var code = req.body[prop]
    if (typeof code == 'string') {
      if (!/^\d+$/.test(code)) return res.json(400, {error: prop + ' is not a number'})
      code = Number(code)
    }
    if (typeof code != 'number' || isNaN(code)) return res.json(400, {error: prop + ' is not a number'})
    if (code <= 0) return res.json(400, {error: prop + ' must be > 0'})
  }

  var quote = extend({}, req.body, {
    id: uuid.v4()
  , payments:[
      {term: 10, annualPayment: 450.0, monthlyPayment: 45.0}
    , {term: 20, annualPayment: 450.0, monthlyPayment: 45.0}
    , {term: 30, annualPayment: 450.0, monthlyPayment: 45.0}
    ]
  , timestamp: new Date().toUTCString()
  })
  quotes[quote.id] = quote
  res.json(quote)
})

app.get('/api/quote', function(req, res) {
  res.json(Object.keys(quotes))
})

app.get('/api/quote/:id', function(req, res) {
  if (!(req.params.id in quotes)) return res.send(404)
  res.json(quotes[req.params.id])
})

// Convenience routes to check and clear test data

app.get('/api/cache/', function(req, res) {
  res.json({leads: leads, quotes: quotes})
})

app.get('/api/cache/clear', function(req, res) {
  leads = {}
  quotes = {}
  res.send(200)
})

app.listen(3000, '0.0.0.0')
console.log('lifequote dev server listening on http://127.0.0.1:3000')
