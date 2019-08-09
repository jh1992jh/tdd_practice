import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, storeFactory } from "../../../test/testUtils";
import ShowMovieInfo from "./ShowMovieInfo";

describe("ShowMovieInfo tests", () => {
  let store;
  let wrapper;

  describe("Render tests when no movie data", () => {
    test("Component renders with no error", () => {
      store = storeFactory({ movie: {} });
      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();
      const component = findByTestAttr(wrapper, "component-show-movie-info");
      expect(component.length).toBe(1);
    });
    test('Renders the "No movie, start by searching one" text if no movie data in redux state', () => {
      store = storeFactory({ movie: {} });
      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();
      const noText = findByTestAttr(wrapper, "no-movie");
      expect(noText.text()).toContain("No movie, start by searching one");
    });
  });
  describe("Render tests with movie data", () => {
    test("Renders component without error if movie data in redux state", () => {
      store = storeFactory({ movie: { movie: { title: "troy" } } });
      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();
      const component = findByTestAttr(wrapper, "component-show-movie-info");
      expect(component.length).toBe(1);
    });

    test("Renders movie data correctly when it's in redux state", () => {
      let store = storeFactory({
        movie: {
          movie: {
            Title: "asd",
            Year: 2004,
            Released: "16th may 2004",
            Runtime: 163,
            Genre: "Drama, History",
            Director: "Lol",
            Writer: "some guy",
            Actors: "asd",
            Plot: "asd",
            Language: "English",
            Poster: "asd"
          }
        }
      });

      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();
      let currentNode;

      const testAttrs = [
        "Title",
        "Year",
        "Rated",
        "Released",
        "Runtime",
        "Genre",
        "Director",
        "Writer",
        "Actors",
        "Plot",
        "Language",
        "Rated"
      ];

      testAttrs.forEach(testAttr => {
        currentNode = findByTestAttr(wrapper, testAttr);
        expect(currentNode.length).toBe(1);
      });
    });
    test("Renders the correct movie data based on redux state", () => {
      let store = storeFactory({
        movie: {
          movie: {
            Title: "asd",
            Year: 2004,
            Released: "16th may 2004",
            Runtime: 163,
            Genre: "Drama, History",
            Director: "Lol",
            Writer: "some guy",
            Actors: "asd",
            Plot: "asd",
            Language: "English",
            Rated: "R",
            Poster: "asd"
          }
        }
      });

      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();

      let currentNode;

      const testAttrs = [
        "Title",
        "Year",
        "Rated",
        "Released",
        "Runtime",
        "Genre",
        "Director",
        "Writer",
        "Actors",
        "Plot",
        "Language",
        "Rated"
      ];

      testAttrs.forEach(testAttr => {
        currentNode = findByTestAttr(wrapper, testAttr);

        expect(currentNode.text()).toContain(
          store.getState().movie.movie[testAttr]
        );
      });

      const poster = findByTestAttr(wrapper, "Poster");
      expect(poster.prop("src")).toBe(store.getState().movie.movie.Poster);
    });
    test("Displays error message if no movie found", () => {
      let store = storeFactory({
        movie: {
          movie: {
            error: "No movie dound with the title asd"
          }
        }
      });

      wrapper = shallow(<ShowMovieInfo store={store} />)
        .dive()
        .dive();

      const errorEl = findByTestAttr(wrapper, "error");
      expect(errorEl.length).toBe(1);
      expect(errorEl.text()).toContain(store.getState().movie.movie.error);
    });
  });
});
