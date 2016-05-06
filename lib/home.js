'use strict'


const Path = require('path')

const internals = {
	rootPath: Path.resolve(__dirname, '../'),
    viewsPath: Path.resolve(__dirname, '../views')
}

exports.register = (server, options,next) => {

	server.dependency('vision',internals.after)

	return next()
}

internals.after = function (server, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
        relativeTo: __dirname
    })

    server.route({
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns the home page',
            handler: {
                view: {
                    template: 'home',
                    context: {
                        path: Path.relative(internals.rootPath, Path.resolve(internals.viewsPath, 'home.html'))
                    }
                }
            }
        }
    })

    return next()
}

exports.register.attributes = {
    name: 'Home'
}
