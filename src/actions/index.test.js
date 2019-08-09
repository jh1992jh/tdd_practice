import moxios from "moxios";

import { storeFactory } from "../../test/testUtils";

import { getMovie } from "./";

describe("getMovie action creator", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("Adds response to the redux state", () => {
    const movie = {
      title: "Troy",
      director: "Wolfgang Petersen",
      plot:
        "An adaptation of Homer's great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.",
      genre: "Drama, History",
      year: 2004
    };
    const title = "troy";

    const store = storeFactory({ movie: {} });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: movie
      });
    });

    return store.dispatch(getMovie(title)).then(() => {
      const newState = store.getState();
      expect(newState.movie.movie).toBe(movie);
    });
  });
});
