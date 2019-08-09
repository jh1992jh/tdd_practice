import { actionTypes } from "../actions";
import movieReducer from "./movieReducer";
import { movie } from "../actions/index.test";

describe("movieReducer tests", () => {
  const movie = {
    title: "Troy",
    director: "Wolfgang Petersen",
    plot:
      "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
    genre: "Drama, History",
    year: 2004
  };

  test("Returns default initialState state of movie: {} when it boots up", () => {
    const newState = movieReducer(undefined, {});
    expect(newState).toEqual({ movie: null });
  });
  test("Updates the state properly when receiving the GET_MOVIE action-type", () => {
    const newState = movieReducer(undefined, {
      type: actionTypes.GET_MOVIE,
      payload: movie
    });
    expect(newState.movie).toEqual(movie);
  });
});
