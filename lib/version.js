'use strict';

//load modules

const PackageFile = require('./../package');

//Declare internals

const internals = {

    response: {
        version: PackageFile.version
    }
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: function (request, reply) {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'version'
};
