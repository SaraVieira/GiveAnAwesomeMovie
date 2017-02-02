'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');


let schema = new mongoose.Schema({
	name: 'string',
	imdbID: 'string'
});

schema.plugin(timestamps);

module.exports = mongoose.model('Movie', schema);
