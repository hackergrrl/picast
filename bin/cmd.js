var http = require('http')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)

if (argv.serve || argv.s) {
  var server = http.createServer(function (req, res) {
    var ps = spawn('omxplayer', ['http://' + req.host + ':5002'])
  })
  server.listen(5001)
} else if (argv._[2]) {
  var server = http.createServer(function (req, res) {
    fs.createFileReadStream(argv._[2]).pipe(res)
  })
  server.listen(5002)
}
