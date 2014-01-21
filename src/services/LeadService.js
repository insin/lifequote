function done(cb) {
  return function(data) {
    cb(null, data)
  }
}

function fail(cb) {
  return function(xhr, textStatus, errorThrown) {
    cb({xhr: xhr, textStatus: textStatus, errorThrown: errorThrown})
  }
}

function request(method, params, cb) {
  var url = params
    , data
  if (typeof params == 'object') {
    url = params.url
    if ('data' in params) data = params.data
  }
  var jqConfig = {
    type: method
  , contentType: 'application/json'
  , dataType: 'json'
  , url: url
  }
  if (typeof data != 'undefined') {
    jqConfig.data = JSON.stringify(data)
  }
  $.ajax(jqConfig).then(done(cb), fail(cb))
}

var post = request.bind(null, 'POST')
  , put = request.bind(null, 'PUT')

var LeadService = {
  createLead: function(cb) {
    post('/api/lead/', cb)
  }

, updateLead: function(data, cb) {
    put({url: '/api/lead', data: data}, cb)
  }

, calculateQuote: function(data, cb) {
    post({url: '/api/quote', data: data}, cb)
  }
}

// Mock service calls if we're running off the filesystem
if (window.location.protocol == 'file:') {
  var delay = function() { return 500 + (Math.random() * 1000) }

  LeadService = {
    createLead: function(cb) {
      setTimeout(cb.bind(null, null, {id: new Date().valueOf().toString()}), delay())
    }

  , updateLead: function(data, cb) {
      setTimeout(cb.bind(null, null), delay())
    }

  , calculateQuote: function(data, cb) {
      setTimeout(cb.bind(null, null, {
        payments:[
          {term: 10, annualPayment: 450.0, monthlyPayment: 45.0}
        , {term: 20, annualPayment: 450.0, monthlyPayment: 45.0}
        , {term: 30, annualPayment: 450.0, monthlyPayment: 45.0}
        ]
      }), delay())
    }
  }
}

module.exports = LeadService