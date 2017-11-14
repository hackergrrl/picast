#!/usr/bin/env node

var http = require('http')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)
var fs = require('fs')
var path = require('path')

if (argv.serve || argv.s) {
  var server = http.createServer(function (req, res) {
    var arg = 'http://' + req.connection.remoteAddress + ':5002' + req.url
    var ps = spawn('omxplayer', [arg])

    res.once('end', function () {
      ps.kill()
    })
  })
  server.listen(5001)
} else if (argv._[2]) {
  var ecstatic = require('ecstatic')

  var dir = path.dirname(argv._[2])
  var server = http.createServer(ecstatic({ root: dir }))
  server.listen(5002)

  // TODO(noffle): use mdns to find the pi
  http.get({
    host: '10.0.0.32',
    port: 5001,
    path: '/' + path.basename(argv._[2])
  })
}
