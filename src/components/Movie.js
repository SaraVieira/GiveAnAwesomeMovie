require('styles/Movie.less');

import React, {PropTypes}  from 'react';

class MovieComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.movie.id}>
          <div className="movie-component">
            <div className="movie-component__poster">
              <img src={'https://image.tmdb.org/t/p/w300/' + this.props.movie.poster_path} />
            </div>
            <div className="movie-component__overview">
              <h1>{this.props.movie.title}</h1>
              <div className="star-ratings-css">
                <div className="star-ratings-css-top" style={{'width': '84%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
              </div>
              <p>{this.props.movie.overview}</p>
            </div>
          </div>
          <div className="movie-component__bg" style={{'backgroundImage' : 'url(https://image.tmdb.org/t/p/w500/' + this.props.movie.backdrop_path + ')'}}></div>
      </div>
    );
  }
}

MovieComponent.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieComponent;
