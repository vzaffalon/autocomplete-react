import React from "react";

export default function SubmissionContent({ submittedValue }) {
  if (!submittedValue) {
    return <></>;
  }

  return <h2>Submitted value is {submittedValue}</h2>;
}
