'use strict';
const path = require('path'),
	Movie = require(path.join(__dirname, '../models/movie.js')),
	Boom = require('boom'),
	unirest = require('unirest');


module.exports = {

	create: (req, res) => {
		const errors = {
			name_error: 'namw is required',
			imdbID_error: 'imdbID is required'
		};

		if (req.payload) {
			['name', 'imdbID_error'].forEach( field => {
				if (!req.payload[field])
					return res(Boom.badData(errors[`${field}_error`]));
			});

			let movie = new Movie();
			movie.name = req.payload['name'];
			movie.imdbID = req.payload['imdbID'];
			movie.save(function(err) {
				if (err) {
					if (err.code ===  11000) {
						return res(Boom.badData('movie already exists'));
					}
				}
			});
			movie.save().then(() => {
				return res(movie);
			});
		}
	},

	getMovie: (req, call) => {
		let request = unirest('GET', `https://api.themoviedb.org/3/find/${req.params.id}`);

		request.query({
			'external_source': 'imdb_id',
			'language': 'en-US',
			'api_key': '7feb83087acd0bcec36d1798ef6b8771'
		});

		request.send('{}');

		request.end(function (res) {
			if (res.error) throw new Error(res.error);
			let id = res.body.movie_results[0].id;
			let req = unirest('GET', `https://api.themoviedb.org/3/movie/${id}`);

			req.query({
				'language': 'en-US',
				'api_key': '7feb83087acd0bcec36d1798ef6b8771'
			});

			req.send('{}');

			req.end(function (res) {
				if (res.error) throw new Error(res.error);
				return call(res.body);
			});
		});
	},

	get: (req, res) => {
		let query = Movie.find();
		query.exec((err, results) => {
			return res(results);
		});
	},

	random: (req, call) => {
		let query = Movie.find();
		query.count().exec(function (err, count) {
			let random = Math.floor(Math.random() * count);
			query.findOne().skip(random).exec(
        function (err, result) {
	let request = unirest('GET', `https://api.themoviedb.org/3/find/${result.imdbID}`);

	request.query({
		'external_source': 'imdb_id',
		'language': 'en-US',
		'api_key': '7feb83087acd0bcec36d1798ef6b8771'
	});

	request.send('{}');

	request.end(function (res) {
		if (res.error) throw new Error(res.error);
		let id = res.body.movie_results[0].id;
		let req = unirest('GET', `https://api.themoviedb.org/3/movie/${id}`);

		req.query({
			'language': 'en-US',
			'api_key': '7feb83087acd0bcec36d1798ef6b8771'
		});

		req.send('{}');

		req.end(function (res) {
			if (res.error) throw new Error(res.error);
			return call(res.body);
		});
	});
        });
		});
	}
};
