'use strict'


const Server = require('./index.js')
const Hoek = require('hoek')
const Config = require('./config')


const internals = {};

internals.manifest = {
	connections: [{
		port:8000,
		labels:['web'],
		host:'localhost'
	},
	{
		port:8001,
		labels:['web-tls'],
		tls:Config.tls,
		host:'localhost'
	}],
	registrations:[
		{
			plugin:'./version',
      options: {
          select: ['web', 'web-tls']
      }
		},
		{
			plugin:'./private',
      options: {
          select: ['web', 'web-tls']
      }
		},
		{
			plugin:'./home',
      options: {
          select: ['web', 'web-tls']
      }
		},
		{
			plugin:'./auth'
		},
		{
			plugin:'hapi-auth-basic'
		},
		{
			plugin:'vision'
		},
		{
			plugin:'inert'
		}
	]
}

internals.composeOptions = {
	relativeTo: __dirname
}

Server.init(internals.manifest,internals.composeOptions, (err, server) => {

	Hoek.assert(!err, err);

// Server connections
const web = server.select('web');
const webTls = server.select('web-tls');


// Logging started server
console.log('Web server started at: ' + web.info.uri);
console.log('WebTLS server started at: ' + webTls.info.uri);
})
