import React from "react";
import translate from "../../translations/translate";

import "./fetch-error-message.scss";

interface FetchErrorMessageProps {
  serverError: any;
}

const FetchErrorMessage: React.FC<FetchErrorMessageProps> = ({
  serverError,
}) => {
  // translation props
  const translationPrefix = "fetchErrorMessage";
  const clientMessageId = translationPrefix + ".clientMessage";
  const instructionId = translationPrefix + ".instruction";

  // error message logging
  if (serverError.response) {
    // Request made and server responded
    console.log(serverError.response.data);
    console.log(serverError.response.status);
    console.log(serverError.response.headers);
  } else if (serverError.request) {
    // The request was made but no response was received
    console.log(serverError.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", serverError.message);
  }

  return (
    <div className="fetch-error-message">
      <h1>Error!</h1>
      <p> {translate(clientMessageId)}</p>
      <p>{translate(instructionId)}</p>
    </div>
  );
};

export default FetchErrorMessage;
