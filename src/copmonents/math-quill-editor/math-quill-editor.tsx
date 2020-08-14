import React, { RefObject, useEffect, useState } from "react";

import "mathquill/build/mathquill";
import "mathquill/build/mathquill.css";

import "./math-quill-editor.scss";

interface MathQuillEditorProps {
  config?: any;
  width?: string;
  startingLatexExpression?: string;
  enableOutput?: boolean;
  showOperationTab?: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

const MathQuillEditor: React.FC<MathQuillEditorProps> = ({
  config,
  startingLatexExpression,
  enableOutput = true,
  showOperationTab = true,
  inputRef,
  width,
}: MathQuillEditorProps) => {
  if (inputRef.current) {
    inputRef.current.style.display = "none";
  }
  const [editor, setEditor] = useState<any>();
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
              if (inputRef.current) {
                inputRef.current.value = mathField.latex();
              }
            },
          },
        });
      } else if (config) {
        mathField.config({
          ...config,
          handlers: {
            edit: function () {
              if (inputRef.current) {
                inputRef.current.value = mathField.latex();
              }
            },
          },
        });
      } else {
        mathField.config({
          handlers: {
            edit: function () {
              if (inputRef.current) {
                inputRef.current.value = mathField.latex();
              }
            },
          },
        });
      }
    }
    setEditor(mathField);
  }, [inputRef]);

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
    <div className="math-quill-editor">
      {showOperationTab && (
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
      )}
      <span
        id={id}
        className="math-quill-editor__main-input"
        style={{ width: width ? width : "100%" }}
      />
    </div>
  );
};

export default MathQuillEditor;
