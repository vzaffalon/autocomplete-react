import React from "react";

export default class OptionsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="options" className="options">
        {!this.props.loadingResults ? (
          <div id="options-list" className="options-list">
            {this.props.listOfItems.length > 0 ? (
              this.props.listOfItems.map((item) => (
                <li
                  id={item.id}
                  onClick={() => this.props.setSelectedSearchItem(item.name)}
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
}
