import React, { useEffect, useState } from "react";

import "./math-quill-editor.scss";

interface MathQuillEditorProps {
  config?: any;
  width?: string;
  startingLatexExpression?: string;
  enableOutput?: boolean;
  showOperationTab?: boolean;
}

const MathQuillEditor: React.FC<MathQuillEditorProps> = ({
  config,
  width,
  startingLatexExpression,
  enableOutput = true,
  showOperationTab = true,
}) => {
  const [editor, setEditor] = useState<any>();
  const [latexOutput, setLatexOutput] = useState<string>(
    startingLatexExpression ? startingLatexExpression : ""
  );

  const id = Date.now().toString();

  useEffect(() => {
    const htmlElement = document.getElementById(id);
    // @ts-ignore
    const MQ = window.MathQuill.getInterface(2);
    const mathField = config
      ? MQ.MathField(htmlElement, config)
      : MQ.MathField(htmlElement, {});

    if (enableOutput) {
      if (config && config.handlers) {
        mathField.config({
          ...config,
          handlers: {
            ...config.handlers,
            edit: function () {
              if (config.handlers.fns.edit) config.handlers.fns.edit();
              setLatexOutput(mathField.latex());
            },
          },
        });
      } else if (config) {
        mathField.config({
          ...config,
          handlers: {
            edit: function () {
              setLatexOutput(mathField.latex());
            },
          },
        });
      } else {
        mathField.config({
          handlers: {
            edit: function () {
              setLatexOutput(mathField.latex());
            },
          },
        });
      }
    }
    setEditor(mathField);
  }, []);

  const actions: { iconUrl: string; latexCmd: string }[] = [
    {
      iconUrl: require("../../assets/math-symbols/sum.svg"),
      latexCmd: "\\sum",
    },
    {
      iconUrl: require("../../assets/math-symbols/square-root.svg"),
      latexCmd: "\\sqrt",
    },
    {
      iconUrl: require("../../assets/math-symbols/pi.svg"),
      latexCmd: "\\pi",
    },
  ];

  return (
    <div className="math-quill-editor u-mt-md u-mb-md">
      <div className="math-quill-editor__operations">
        {actions.map((action, i) => {
          const { iconUrl, latexCmd } = action;
          return (
            <div key={i} className="math-quill-editor__operation">
              <img src={iconUrl} onClick={() => editor.cmd(latexCmd)} />
            </div>
          );
        })}
      </div>
      <div
        id={id}
        className="math-quill-editor__main-input"
        // style={{ width: width ? width : "100%" }}
      />
      {enableOutput && (
        <div className="math-quill-editor__latex-output">
          <b>Latex:</b>
          <input
            type="text"
            value={latexOutput}
            onChange={(event) => {
              setLatexOutput(event.target.value);
              editor.latex(event.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MathQuillEditor;
