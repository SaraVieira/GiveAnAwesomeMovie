'use strict';
const path = require('path'),
	Movie = require(path.join(__dirname, '../models/movie.js')),
	Boom = require('boom'),
	unirest = require('unirest'),
  movieTrailer = require('movie-trailer');


module.exports = {

	create: (req, res) => {
    let payload = JSON.parse(req.payload);
		const errors = {
			name_error: 'name is required',
			imdbID_error: 'imdbID is required'
		};

		if (payload) {
			['name', 'imdbID'].forEach( field => {
				if (!payload[field])
					return res(Boom.badData(errors[`${field}_error`]));
			});

			let movie = new Movie();
			movie.name = payload['name'];
			movie.imdbID = payload['imdbID'];
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

	delete: (req, res) => {
		let query = Movie.findByIdAndRemove(req.params.id);
		query.exec((err, results) => {
			return res(results);
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
      query.findOne().skip(random).exec(function (err, result) {
        let request = unirest('GET', `https://api.themoviedb.org/3/find/${result.imdbID}`);

        request.query({
          'external_source': 'imdb_id',
          'language': 'en-US',
          'api_key': '7feb83087acd0bcec36d1798ef6b8771'
        });

        request.send('{}');

        request.end(function (res) {
          if (res.error) throw new Error(res.error);
          let movie = res.body.movie_results[0];
          let id = movie.id;
          let req = unirest('GET', `https://api.themoviedb.org/3/movie/${id}`);

          req.query({
            'language': 'en-US',
            'api_key': '7feb83087acd0bcec36d1798ef6b8771'
          });

          req.send('{}');

          req.end(function (res) {
            if (res.error) throw new Error(res.error);
            let movie = res.body;
            let year = movie.release_date.split('-')[0];
            movieTrailer(movie.original_title, parseInt(year), function (err, res) {
                if (err) throw new Error(res.error);
                console.log(res);
                movie.trailer = res;
                return call(movie);
            });
          });
        });
      });
		});
	}
};
