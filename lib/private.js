'use strict'



const internals = {}



exports.register = (server,options, next) => {

	server.dependency('Auth', internals.after);

    return next();

}

internals.after = (server,next) => {

	server.route({
			method:'GET',
			path:'/private',
			config:{
				auth:'basic',
				description:'Returns a greeting message to user',
				handler: (request,reply) => {

					let html = '<div> Hello ' + request.auth.credentials.name + '</div>'
					return reply(html)
				}
			}
		})

	return next()
}

exports.register.attributes = {
	name:'Private'
}