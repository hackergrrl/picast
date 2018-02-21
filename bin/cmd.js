#!/usr/bin/env node

var argv = require('minimist')(process.argv)
var fs = require('fs')
var path = require('path')

var server = require('../server')
var client = require('../client')

if (argv.serve || argv.s) server(5001)
else if (argv._[2]) client(argv._[2])
else exit(1)

function exit (code) {
  fs.createReadStream(path.join(__dirname, 'USAGE')).pipe(process.stdout)
  process.stdout.on('end', function () {
    process.exit(code)
  })
}
