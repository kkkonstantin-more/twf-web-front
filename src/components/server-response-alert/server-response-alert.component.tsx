// libs and hooks
import React, { CSSProperties } from "react";

export interface ServerResponseAlert {
  errorMsg: string | null;
  successMsg: string | null;
  style?: CSSProperties;
}

const ServerResponseAlert = ({
  errorMsg,
  successMsg,
  style,
}: ServerResponseAlert) => {
  return (
    <div style={style}>
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
    </div>
  );
};

export default ServerResponseAlert;
