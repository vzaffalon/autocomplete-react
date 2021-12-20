import "./App.css";
import React from "react";

const items = [
  { id: 1, name: "banana" },
  { id: 2, name: "strawberry" },
  { id: 3, name: "apple" },
  { id: 4, name: "american cookies" },
  { id: 5, name: "Alfalfa" },
  { id: 6, name: "2 apples" },
  { id: 7, name: "fun fruit" },
  { id: 8, name: "dragon fruit" }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: [],
      isOptionsModalOpened: false,
      currentSearchedValue: null,
      submittedValue: null,
      loadingResults: false
    };
  }

  setSelectedSearchItem = (selectedValue) => {
    this.setState({
      currentSearchedValue: selectedValue,
      isOptionsModalOpened: false
    });
  };

  submitSearch = () => {
    this.setState({
      submittedValue: this.state.currentSearchedValue,
      isOptionsModalOpened: false
    });
  };

  getLisOfItems = async (searchedValue) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        console.log({ searchedValue });
        const filteredItems = items.filter((item) =>
          item.name.toLowerCase().startsWith(searchedValue.toLowerCase())
        );
        resolve(filteredItems);
      }, 1000)
    );
  };

  updateListOfItems = async (e) => {
    this.setState({
      submittedValue: null
    });

    const searchedValue = e.target.value;
    this.setState({
      currentSearchedValue: searchedValue
    });

    if (searchedValue.length === 0) {
      return;
    }

    this.setState({
      loadingResults: true
    });
    const filteredItems = await this.getLisOfItems(searchedValue);
    this.setState({
      loadingResults: false
    });

    this.setState({
      filteredItems,
      isOptionsModalOpened: true
    });
  };

  render() {
    console.log("filteredItems", this.state.filteredItems);
    return (
      <div className="App">
        <div id="background" className="background">
          <div className="centered">
            <div id="auto-complete" className="auto-complete">
              <div id="search-box" className="search-box">
                <input
                  type="text"
                  id="search-input"
                  value={this.state.currentSearchedValue}
                  onChange={(e) => this.updateListOfItems(e)}
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
              {this.state.isOptionsModalOpened &&
                this.state.currentSearchedValue &&
                this.state.currentSearchedValue.length > 0 && (
                  <div id="options" className="options">
                    {!this.state.loadingResults ? (
                      <div id="options-list" className="options-list">
                        {this.state.filteredItems.length > 0 ? (
                          this.state.filteredItems.map((item) => (
                            <li
                              id={item.id}
                              onClick={() =>
                                this.setSelectedSearchItem(item.name)
                              }
                              className="options-item"
                            >
                              <p className="option-text">{item.name}</p>
                            </li>
                          ))
                        ) : (
                          <li id="1" className="options-no-item">
                            <p className="option-text">No options found.</p>
                          </li>
                        )}
                      </div>
                    ) : (
                      <li id="1" className="options-no-item">
                        <p className="option-text">Loading results...</p>
                      </li>
                    )}
                  </div>
                )}
              {this.state.submittedValue && (
                <h2>Submitted value is {this.state.submittedValue}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
