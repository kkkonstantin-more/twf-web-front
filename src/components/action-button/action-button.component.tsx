import React from "react";
import Icon from "@mdi/react";
import "./action-button.styles.scss";

const ActionButton = ({
  action,
  mdiIconPath,
  size,
  margin,
}: {
  mdiIconPath: string;
  size: number;
  action: () => any;
  margin?: string;
}): JSX.Element => {
  return (
    <button
      className="action-button"
      style={{ margin: margin ? margin : "" }}
      onClick={() => {
        action();
      }}
    >
      <Icon path={mdiIconPath} size={size} />
    </button>
  );
};

export default ActionButton;
