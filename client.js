var http = require('http')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)
var fs = require('fs')
var path = require('path')
var tty = require('tty')
var request = require('request')
var ecstatic = require('ecstatic')

module.exports = function (param) {
  process.stdin.setRawMode(true)

  var arg
  if (/^https?.*youtube/.test(param)) {
    arg = encodeURIComponent(param)
  } else {
    var dir = path.dirname(param)
    var server = http.createServer(ecstatic({ root: dir }))
    server.listen(5002)
    arg = path.basename(param)
  }

  // TODO(noffle): use mdns to find the pi
  var req = request.post({
    url: 'http://10.0.0.32:5001/' + arg,
    timeout: 9999999
  })
  process.stdin.pipe(req)

  setTimeout(function () {
    req.write(' ')
    req.write(' ')
  }, 1000)

  req.on('error', console.log)
  req.on('response', function () {
    console.log('done')
    process.stdin.setRawMode(false)
    process.exit(0)
  })
}
