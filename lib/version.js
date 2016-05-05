'use strict'



const PackageFile = require('../package.json')

const internals = {
    response: {
        version: PackageFile.version
    }
}

exports.register = (server,options,next) => {

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

    return next()
}

exports.register.attributes = {
    name: 'version'
}