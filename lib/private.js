'use strict'


const Basic = require('hapi-auth-basic')
const Bcrypt = require('bcrypt')
const Users = require('./users.json')

const internals = {}

internals.validateFunc = (request, username, password, callback) => {

	let user = Users[username]
	if(!user) {
		return callback(null, false)
	}

	Bcrypt.compare(password, user.password, (err,isValid) => {

		callback(err,isValid,{id:user.id, name:user.name})	
	})
}

exports.register = (server,options, next) => {

	server.register(Basic, (err) => {

		if(err) {
			return next(err)
		}

		server.auth.strategy('basic','basic', {validateFunc: internals.validateFunc})
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
	})

}

exports.register.attributes = {
	name:'Private'
}