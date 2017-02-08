const path = require('path'),
	controller = require( path.join(__dirname, '../controllers/movies.js') );

module.exports = [
	{
		method: 'POST',
		path: '/api/movie',
		handler: controller.create
	},
	{
		method: 'GET',
		path: '/api/movie',
		handler: controller.get
	},
  {
		method: 'DELETE',
		path: '/api/movie/{id}',
		handler: controller.delete
	},
	{
		method: 'GET',
		path: '/api/movie/{id}',
		handler: controller.getMovie
	},
	{
		method: 'GET',
		path: '/api/movie/random',
		handler: controller.random
	}
];
