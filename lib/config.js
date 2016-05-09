'use strict'

const Fs = require('fs')

const internals = {}

exports.tls = {
    key: Fs.readFileSync('./lib/certs/server.key'),
    cert: Fs.readFileSync('./lib/certs/server.crt'),

    requestCert: true,

    ca: []
}
