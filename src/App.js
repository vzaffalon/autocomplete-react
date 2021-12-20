import "./App.css";
import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="background">
          <div>
            <div id="auto-complete">
              <div id="search-box">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Type to search..."
                ></input>
                <button>Submit</button>
              </div>
              <div id="options">
                <div id="options-list">
                  <li id={1}>
                    <p>item</p>
                  </li>
                  <li id={2}>
                    <p>item 2</p>
                  </li>
                  <li id={3}>
                    <p>item 3</p>
                  </li>
                  ))
                </div>
              </div>
              <h2>Submitted value is value</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
