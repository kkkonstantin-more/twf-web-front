// libs and hooks
import React from "react";

export interface ServerResponseAlert {
  errorMsg: string | null;
  successMsg: string | null;
}

const ServerResponseAlert = ({ errorMsg, successMsg }: ServerResponseAlert) => {
  return (
    <>
      {errorMsg && (
        <div
          style={{ width: "100%" }}
          className="alert alert-danger"
          role="alert"
        >
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div
          style={{ width: "100%" }}
          className="alert alert-success"
          role="alert"
        >
          {successMsg}
        </div>
      )}
    </>
  );
};

export default ServerResponseAlert;
