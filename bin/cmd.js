var url = require('url')
var http = require('http')
var qs = require('querystring')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)
var ecstatic = require('ecstatic')

if (argv.serve || argv.s) {
  var server = http.createServer(function (req, res) {
    var mediaTargetUrl = qs.parse(url.parse(req.url).query).target
    console.log('target', mediaTargetUrl)

    var ps = spawn('omxplayer', [mediaTargetUrl])
  })
  server.listen(5001)
} else if (argv._[2]) {
  var server = http.createServer(ecstatic({ root: process.cwd() }))
  server.listen(5002)

  var target = encodeURIComponent('http://10.0.0.10:5002/' + argv[2])

  // TODO(noffle): use mdns to find the pi
  http.get({
    host: '10.0.0.32',
    port: 5001,
    path: '/?target='+target
  })
}
