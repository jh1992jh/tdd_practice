import React, { Component } from "react";
import "./App.scss";

import SearchInputNav from "./components/searchInput/SearchInputNav";
import ShowMovieInfo from "./components/showMovieInfo/ShowMovieInfo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchInputNav />
        <ShowMovieInfo />
      </div>
    );
  }
}

export default App;
