import "../App.css";
import React from "react";
import OptionsList from "./OptionsList";
import SubmissionContent from "./SubmissionContent";

const items = [
  { id: 1, name: "banana" },
  { id: 2, name: "strawberry" },
  { id: 3, name: "apple" },
  { id: 4, name: "american cookies" },
  { id: 5, name: "Alfalfa" },
  { id: 6, name: "2 apples" },
  { id: 7, name: "fun fruit" },
  { id: 8, name: "dragon fruit" },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: [],
      isOptionsModalOpened: false,
      currentSearchedValue: "",
      submittedValue: null,
      loadingResults: false,
    };
  }

  setSelectedSearchItem = (selectedValue) => {
    this.setState({
      currentSearchedValue: selectedValue,
      isOptionsModalOpened: false,
    });
  };

  submitSearch = () => {
    this.setState((state) => {
      return {
        submittedValue: state.currentSearchedValue,
        isOptionsModalOpened: false,
      };
    });
  };

  getLisOfItems = async (searchedValue) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const filteredItems = items.filter((item) =>
          item.name.toLowerCase().startsWith(searchedValue.toLowerCase())
        );
        resolve(filteredItems);
      }, 1000)
    );
  };

  updateListOfItems = async (e) => {
    const searchedValue = e.target.value;
    this.setState({
      currentSearchedValue: searchedValue,
    });

    if (searchedValue.length === 0) {
      return;
    }

    this.setState({
      loadingResults: true,
    });

    const filteredItems = await this.getLisOfItems(searchedValue);

    this.setState({
      loadingResults: false,
    });

    this.setState({
      filteredItems,
      isOptionsModalOpened: true,
    });
  };

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
                  <OptionsList
                    setSelectedSearchItem={this.setSelectedSearchItem}
                    loadingResults={this.state.loadingResults}
                    listOfItems={this.state.filteredItems}
                  />
                )}
              <SubmissionContent submittedValue={this.state.submittedValue} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
