require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import Movie from './Movie';

const apiKey = '7feb83087acd0bcec36d1798ef6b8771';
const ids = [
  'tt0081505',
  'tt1922777',
  'tt1591095',
  'tt2226417',
  'tt2752772',
  'tt1457767',
  'tt3065204'
];

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movie: {} };
    this.getRandomMovie = this.getRandomMovie.bind(this);
  }

  getRandomMovie() {
    var rand = ids[Math.floor(Math.random() * ids.length)];
    fetch('https://api.themoviedb.org/3/find/' + rand + '?api_key=' + apiKey + '&language=en-US&external_source=imdb_id')
    .then((response) => response.json())
    .then((data) => this.setState({movie: data.movie_results[0]}))
  }

  componentWillMount() {
    this.getRandomMovie();
  }

  render() {
    return (
      <div className="container">
        <Movie movie={this.state.movie}/>
        <button onClick={this.getRandomMovie}>Random</button>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
