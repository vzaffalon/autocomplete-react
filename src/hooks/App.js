import "../App.css";
import React, { useState } from "react";
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

export default function App() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOptionsModalOpened, setIsOptionsModalOpened] = useState(false);
  const [currentSearchedValue, setCurrentSearchedValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState(null);
  const [loadingResults, setLoadingResults] = useState(false);

  const setSelectedSearchItem = (selectedValue) => {
    setCurrentSearchedValue(selectedValue);
    setIsOptionsModalOpened(false);
  };

  const submitSearch = () => {
    setSubmittedValue(currentSearchedValue);
    setIsOptionsModalOpened(false);
  };

  const getLisOfItems = async (searchedValue) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const filteredItems = items.filter((item) =>
          item.name.toLowerCase().startsWith(searchedValue.toLowerCase())
        );
        resolve(filteredItems);
      }, 1000)
    );
  };

  const updateListOfItems = async (e) => {
    const searchedValue = e.target.value;
    setCurrentSearchedValue(searchedValue);

    if (searchedValue.length === 0) {
      return;
    }

    setLoadingResults(true);

    const filteredItems = await getLisOfItems(searchedValue);

    setLoadingResults(false);

    setFilteredItems(filteredItems);
    setIsOptionsModalOpened(true);
  };

  return (
    <div className="App">
      <div id="background" className="background">
        <div className="centered">
          <div id="auto-complete" className="auto-complete">
            <div id="search-box" className="search-box">
              <input
                type="text"
                id="search-input"
                value={currentSearchedValue}
                onChange={(e) => updateListOfItems(e)}
                placeholder="Type to search..."
                className="search-input"
              ></input>
              <button
                onClick={() => submitSearch()}
                className="btn submit-button"
              >
                Submit
              </button>
            </div>
            {isOptionsModalOpened &&
              currentSearchedValue &&
              currentSearchedValue.length > 0 && (
                <OptionsList
                  setSelectedSearchItem={setSelectedSearchItem}
                  loadingResults={loadingResults}
                  listOfItems={filteredItems}
                />
              )}
            <SubmissionContent submittedValue={submittedValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
