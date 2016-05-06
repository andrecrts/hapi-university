'use strict'


const Server = require('./index.js')


const internals = {};

Server.init(8000, (err, server) => {
	
	console.log('Server started at: ' + server.info.uri)
})