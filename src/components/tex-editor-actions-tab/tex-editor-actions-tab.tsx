import React from "react";
// icons
import sumIcon from "../../assets/math-symbols/sum.svg";
import squareIcon from "../../assets/math-symbols/square-root.svg";
import piIcon from "../../assets/math-symbols/pi.svg";
// types
import { MathField } from "react-mathquill";
// styles
import "./tex-editor-actions-tab.scss";

const TexEditorActionsTab: React.FC<{ mathField: MathField }> = ({
  mathField,
}) => {
  const actions = [
    {
      iconUrl: sumIcon,
      latexCmd: "\\sum",
    },
    {
      iconUrl: squareIcon,
      latexCmd: "\\sqrt",
    },
    {
      iconUrl: piIcon,
      latexCmd: "\\pi",
    },
  ];

  return (
    <div className="tex-editor-actions-tab">
      {actions.map((action, i) => {
        const { iconUrl, latexCmd } = action;
        return (
          <div key={i} className="tex-editor-actions-tab__operation">
            <img src={iconUrl} onClick={() => mathField.cmd(latexCmd)} />
          </div>
        );
      })}
    </div>
  );
};

export default TexEditorActionsTab;
