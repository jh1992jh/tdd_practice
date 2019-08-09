import axios from "axios";
export const actionTypes = {
  GET_MOVIE: "GET_MOVIE"
};

export const getMovie = title => async dispatch => {
  const movieJSON = await axios.get(
    `http://www.omdbapi.com/?apikey=${
      process.env.REACT_APP_MOVIE_API
    }&t=${title}`
  );

  let movieData;
  if (movieJSON.data.Error) {
    movieData = { error: `No movie found with the title ${title}` };
  } else {
    movieData = movieJSON.data;
  }
  return dispatch({ type: actionTypes.GET_MOVIE, payload: movieData });
};
