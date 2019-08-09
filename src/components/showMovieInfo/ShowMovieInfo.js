import React, { Fragment } from "react";
import { connect } from "react-redux";

const ShowMovieInfo = ({ movie }) => {
  let output;

  if (!movie.movie) {
    output = <h3 data-test="no-movie">No movie, start by searching one</h3>;
  } else if (movie.movie.error) {
    output = <h3 data-test="error">{movie.movie.error}</h3>;
  } else {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Writer,
      Actors,
      Plot,
      Language,
      Poster
    } = movie.movie;

    output = (
      <Fragment>
        <div className="poster-wrapper">
          <img data-test="Poster" src={Poster} alt="movie poster" />
        </div>
        <div className="movie-info-list">
          <ul>
            <li data-test="Title">{Title}</li>
            <li data-test="Year">{Year}</li>
            <li data-test="Rated">{Rated}</li>
            <li data-test="Released">{Released}</li>
            <li data-test="Runtime">{Runtime}</li>
            <li data-test="Genre">{Genre}</li>
            <li data-test="Director">{Director}</li>
            <li data-test="Writer">{Writer}</li>
            <li data-test="Actors">{Actors}</li>
            <li data-test="Plot">{Plot}</li>
            <li data-test="Language">{Language}</li>
          </ul>
        </div>
      </Fragment>
    );
  }
  return (
    <div data-test="component-show-movie-info" className="show-movie-info">
      {output}
    </div>
  );
};

const mapStateToProps = state => ({
  movie: state.movie
});

export default connect(mapStateToProps)(ShowMovieInfo);
