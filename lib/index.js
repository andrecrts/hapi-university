'use strict';

const Hapi = require('hapi')
const PackageFile = require('../package.json')

// Create a server with a host and port

const internals = {
    response: {
        version: PackageFile.version
    }
}


internals.init = _ => {

    let server = new Hapi.Server()
    server.connection({port: process.env.PORT || 8000})

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description:'returns version',
            handler: (request,reply) =>{

                return reply(internals.response)
            }
        }
    })

    server.start((err) => {

        console.log('Server started at: ' + server.info.uri)
    })
}

internals.init()

