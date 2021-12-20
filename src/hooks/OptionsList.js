import React from "react";

export default function OptionsList({
  listOfItems,
  loadingResults,
  setSelectedSearchItem,
}) {
  return (
    <div id="options" className="options">
      {!loadingResults ? (
        <div id="options-list" className="options-list">
          {listOfItems.length > 0 ? (
            listOfItems.map((item) => (
              <li
                id={item.id}
                onClick={() => setSelectedSearchItem(item.name)}
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
  );
}
