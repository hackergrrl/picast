#!/usr/bin/env node

var http = require('http')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)
var fs = require('fs')
var path = require('path')
var tty = require('tty')
var request = require('request')

if (argv.serve || argv.s) {
  var server = http.createServer(function (req, res) {
  console.log('incoming')
    var arg = 'http://' + req.connection.remoteAddress + ':5002' + req.url
    var ps = spawn('omxplayer', [arg])

    req.on('data', function (d) {
      ps.stdin.write(d)
    })

    req.once('close', function () {
      ps.stdin.write('q')
    })
    ps.on('exit', function () {
      res.end()
    })
  })
  server.listen(5001, function () {
    console.log('running on port 5001')
  })
  server.setTimeout(1000 * 60 * 60 * 10)
} else if (argv._[2]) {
  var ecstatic = require('ecstatic')

  process.stdin.setRawMode(true)

  var dir = path.dirname(argv._[2])
  var server = http.createServer(ecstatic({ root: dir }))
  server.listen(5002)

  // TODO(noffle): use mdns to find the pi
  var req = request.post({
    url: 'http://10.0.0.32:5001/' + path.basename(argv._[2]),
    timeout: 9999999
  })
  process.stdin.pipe(req)

  setTimeout(function () {
    req.write(' ')
    req.write(' ')
  }, 1000)

  req.on('response', function () {
    console.log('done')
    process.stdin.setRawMode(false)
    process.exit(0)
  })
}
