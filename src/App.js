import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div id="background" className="background">
          <div className="centered">
            <div id="auto-complete" className="auto-complete">
              <div id="search-box" className="search-box">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Type to search..."
                  className="search-input"
                ></input>
                <button
                  onClick={() => this.submitSearch()}
                  className="btn submit-button"
                >
                  Submit
                </button>
              </div>
              <div id="options" className="options">
                <div id="options-list" className="options-list">
                  <li id={1} className="options-item">
                    <p className="option-text">item</p>
                  </li>
                </div>
                <h2>Submitted value is value</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
