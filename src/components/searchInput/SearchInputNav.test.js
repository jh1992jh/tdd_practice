import React from "react";
import { shallow } from "enzyme";
import SearchInputNav, { UnconnectedSearchInputNav } from "./SearchInputNav";

import { findByTestAttr, storeFactory } from "../../../test/testUtils.js";

import { getMovie } from "../../actions";

const setup = props => {
  const store = storeFactory({ movie: {} });
  const wrapper = shallow(<SearchInputNav store={store} {...props} />).dive();

  return wrapper;
};

describe("SearchInputNav tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  describe("render tests", () => {
    test("Renders SearchInputNav without error", () => {
      const component = findByTestAttr(wrapper, "component-search-input-nav");
      expect(component.length).toBe(1);
    });

    test("Renders search-input-Form without error", () => {
      const searchInputForm = findByTestAttr(wrapper, "search-input-form");
      expect(searchInputForm.length).toBe(1);
    });

    test("Renders search-input without error", () => {
      const searchInput = findByTestAttr(wrapper, "search-input");
      expect(searchInput.length).toBe(1);
    });

    test("Renders submit button without error", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(1);
    });
  });
});

describe("Has the intended props", () => {
  test("Has getMovie as a prop", () => {
    const wrapper = setup({ getMovie });

    expect(wrapper.instance().props.getMovie).toBeInstanceOf(Function);
  });
});

describe("Calls getMovie, also with proper args", () => {
  let getMovieMock;
  let wrapper;
  let submitButton;
  let searchTerm = "troy";
  beforeEach(() => {
    getMovieMock = jest.fn();
    const props = {
      getMovie: getMovieMock
    };

    wrapper = shallow(<UnconnectedSearchInputNav {...props} />);
    wrapper.setState({ inputText: searchTerm });
    submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("getMovie gets called when submit-button is clicked", () => {
    const getMovieCallCount = getMovieMock.mock.calls.length;
    expect(getMovieCallCount).toBe(1);
  });

  test("getMovie gets called with a correct arg", () => {
    const getMovieArg = getMovieMock.mock.calls[0][0];
    expect(getMovieArg).toBe(searchTerm);
  });
});
