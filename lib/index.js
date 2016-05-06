'use strict';

const Glue = require('glue')

// Create a server with a host and port

const internals = {}


exports.init = (manifest,options, next) => {

    Glue.compose(manifest,options, (err,server) => {

        if(err) {
            return next(err)
        }

        server.start((err) => {
            return next(err, server)
        })
    })
}

