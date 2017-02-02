const path = require('path'),
	controller = require( path.join(__dirname, '../controllers/users.js') );

module.exports = [
	{
		method: 'POST',
		path: '/api/user',
		handler: controller.create
	},
	{
		method: 'GET',
		path: '/api/user',
		handler: controller.get
	}
];
