'use strict';

const Hapi = require('hapi')
const Version = require('./version');

// Create a server with a host and port

const internals = {}


internals.init = () => {

    let server = new Hapi.Server()
    server.connection({port: process.env.PORT || 8000})
    server.register(Version, (err) => {

        server.start((err) => {
            console.log('Server started at: ' + server.info.uri)
        })
    })
}

internals.init()

