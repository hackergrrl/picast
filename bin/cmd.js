#!/usr/bin/env node

var http = require('http')
var spawn = require('child_process').spawn
var argv = require('minimist')(process.argv)
var fs = require('fs')
var path = require('path')
var tty = require('tty')
var request = require('request')

var server = require('../server')
var client = require('../client')

if (argv.serve || argv.s) server(5001)
else if (argv._[2]) client(argv._[2])
else { console.log('USAGE: picast FILE|URL'); process.exit(1) }

