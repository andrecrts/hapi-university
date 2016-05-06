'use strict'



const Bcrypt = require('bcrypt')
const Users = require('./users.json')

const internals = {}

exports.register = (server,options,next) => {

	server.dependency('hapi-auth-basic',internals.after)
	return next()
}

exports.register.attributes = {
    name: 'Auth'
}

internals.validateFunc = (request, username, password, callback) => {

	let user = Users[username]
	if(!user) {
		return callback(null, false)
	}

	Bcrypt.compare(password, user.password, (err,isValid) => {

		callback(err,isValid,{id:user.id, name:user.name})	
	})
}

internals.after = (server,next) => {

	server.auth.strategy('basic','basic', {validateFunc: internals.validateFunc})
	return next()
}