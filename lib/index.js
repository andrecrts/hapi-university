'use strict';

const Hapi = require('hapi')
const Version = require('./version')
const Private = require('./private')

// Create a server with a host and port

const internals = {}


exports.init = (port, next) => {

    let server = new Hapi.Server()
    server.connection({port: port || 8000})
    server.register([Version,Private], (err) => {

        if(err) {
            return next(err)
        }

        server.start((err) => {
            return next(err, server)
        })
    })
}

