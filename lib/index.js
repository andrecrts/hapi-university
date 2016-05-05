'use strict';

const Hapi = require('hapi');
const Version = require('./version');

// Create a server with a host and port

const internals = {};


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register(Version, (err) => {

        if (err) {
            return next(err);
        }

        server.start((err) => {

            return next(err, server);
        });
    });
};

