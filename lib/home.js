'use strict'


const Path = require('path')

const internals = {
	rootPath: Path.resolve(__dirname, '../'),
  viewsPath: Path.resolve(__dirname, '../views')
}

exports.register = (server, options,next) => {

	server.dependency(['inert','vision'],internals.after)

	return next()
}

internals.after = function (server, next) {

    server.views({
        engines: {
            html: require('handlebars')
        },
        path: '../views',
				partialsPath:'../views/partials/',
        relativeTo: __dirname
    })

		server.route([


        {
            method: 'GET',
            path: '/images/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/images'
                }
            }
        },

        // Scripts

        {
            method: 'GET',
            path: '/scripts/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/scripts'
                }
            }
        },

        // Styles

        {
            method: 'GET',
            path: '/styles/{assetpath*}',
            handler: {
                directory: {
                    path: './assets/styles'
                }
            }
        }
    ])

    server.route([{
        method: 'GET',
        path: '/home',
        config: {
            description: 'Returns the home page',
            handler: {
                view: {
                    template: 'home'
                }
            }
        }
    },{
        method: 'GET',
        path: '/login',
        config: {
            description: 'Returns the login page',
            handler: {
                view: {
                    template: 'login'
                }
            }
        }
    }])

    return next()
}

exports.register.attributes = {
    name: 'Home'
}
