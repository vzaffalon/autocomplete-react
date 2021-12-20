import React from "react";

export default class SubmissionContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.submittedValue) {
      return <></>;
    }

    return <h2>Submitted value is {this.props.submittedValue}</h2>;
  }
}
