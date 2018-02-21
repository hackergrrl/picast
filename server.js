var http = require('http')
var spawn = require('child_process').spawn

module.exports = function (port) {
  var server = http.createServer(function (req, res) {
    console.log('incoming', req.url)

    if (/^\/https?.*youtube/.test(req.url)) handleYoutube(req, res)
    else handleLocalMedia(req, res)
  })

  server.listen(port, function () {
    console.log('running on port', port)
  })
  server.setTimeout(1000 * 60 * 60 * 10)
}

function handleLocalMedia (req, res) {
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
}

function handleYoutube (req, res) {
  var url = decodeURIComponent(req.url.substring(1))
  var ytdl = spawn('youtube-dl', [url, '-f', '18', '-o', '/tmp/video.mp4'])
  ytdl.stdout.on('data', function (str) {
    str = str.toString()
    if (/\[download\] Destination: \/tmp\/video.mp4/.test(str)) {
      console.log('play')
      play()
    }
    console.log(str)
  })

  function play () {
    var ps = spawn('omxplayer', ['/tmp/video.mp4.part'])

    req.on('data', function (d) {
      ps.stdin.write(d)
    })

    ps.stderr.pipe(process.stderr)
    ps.stdout.pipe(process.stdout)
    req.once('close', function () {
      ps.stdin.write('q')
    })
    ps.on('exit', function () {
      res.end()
    })
  }
}
