import React, { Component } from "react";
import { connect } from "react-redux";

import { getMovie } from "../../actions";

export class UnconnectedSearchInputNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: ""
    };
  }

  render() {
    const { inputText } = this.state;
    let disabled = inputText.length < 1;
    return (
      <nav data-test="component-search-input-nav" className="search-input-nav">
        <form data-test="search-input-form" className="search-input-form">
          <input
            data-test="search-input"
            type="text"
            name="inputText"
            id="inputText"
            value={inputText}
            onChange={e => this.setState({ inputText: e.target.value })}
          />
          <button
            data-test="submit-button"
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.props.getMovie(inputText);
            }}
            disabled={disabled}
          >
            Search
          </button>
        </form>
      </nav>
    );
  }
}

export default connect(
  null,
  { getMovie }
)(UnconnectedSearchInputNav);
