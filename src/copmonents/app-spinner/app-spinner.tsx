import React from "react";

import ClipLoader from "react-spinners/ClipLoader";

const override = `
  display: block;
  margin: 0 auto;
`;

const AppSpinner: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <ClipLoader
      css={override}
      size={"4rem"}
      color={"#455a64"}
      loading={loading}
    />
  );
};

export default AppSpinner;
