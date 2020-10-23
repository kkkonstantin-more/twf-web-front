import React from "react";
import Icon from "@mdi/react";
import "./action-button.styles.scss";
import { ActionButtonProps } from "./action-button.types";

const ActionButton = ({
  action,
  mdiIconPath,
  size,
  margin,
}: ActionButtonProps): JSX.Element => {
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
