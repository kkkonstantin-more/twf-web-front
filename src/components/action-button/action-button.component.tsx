// libs and hooks
import React from "react";
// types
import { ActionButtonProps } from "./action-button.types";
// icons
import Icon from "@mdi/react";
// styles
import "./action-button.styles.scss";

const ActionButton = ({
  action,
  mdiIconPath,
  size,
  margin,
  tooltip,
}: ActionButtonProps): JSX.Element => {
  return (
    <button
      className="action-button"
      style={{ margin: margin ? margin : "" }}
      onClick={() => {
        action();
      }}
    >
      {tooltip && (
        <span
          className="action-button__tooltip"
          style={{ top: size + 1 + "rem" }}
        >
          {tooltip}
        </span>
      )}
      <Icon path={mdiIconPath} size={size} />
    </button>
  );
};

export default ActionButton;
