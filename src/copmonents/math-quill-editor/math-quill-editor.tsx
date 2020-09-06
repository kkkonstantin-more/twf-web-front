import React, { RefObject, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "mathquill/build/mathquill";
import "mathquill/build/mathquill.css";

import "./math-quill-editor.scss";

interface MathQuillEditorProps {
  inputRef: RefObject<HTMLInputElement>;
  config?: any;
  width?: string;
  startingLatexExpression?: string;
  enableOutput?: boolean;
  showOperationTab?: boolean;
  updateValue?: React.Dispatch<string>;
  isInvalid?: boolean;
}

const MathQuillEditor: React.FC<MathQuillEditorProps> = ({
  config,
  startingLatexExpression,
  showOperationTab = true,
  inputRef,
  width,
  updateValue,
  isInvalid,
}: MathQuillEditorProps) => {
  if (inputRef.current) {
    inputRef.current.style.display = "none";
  }
  const [editor, setEditor] = useState<any>();
  // generating unique id by uuid library
  const id = uuidv4();

  useEffect(() => {
    const htmlElement = document.getElementById(id);
    // @ts-ignore
    const MQ = window.MathQuill.getInterface(2);
    const mathField = config
      ? MQ.MathField(htmlElement, config)
      : MQ.MathField(htmlElement);

    if (config && config.handlers) {
      mathField.config({
        ...config,
        handlers: {
          ...config.handlers,
          edit: function () {
            // edit function initialized for the first time
            if (config.handlers.fns && config.handlers.fns.edit) {
              config.handlers.fns.edit();
            }
            // edit function is already initialized
            // if (config.handlers.edit) {
            //   config.handlers.edit();
            // }
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
        spaceBehavesLikeTab: true,
        handlers: {
          edit: function () {
            if (inputRef.current) {
              inputRef.current.value = mathField.latex();
            }
            if (updateValue) {
              updateValue(mathField.latex());
            }
          },
        },
      });
    }

    if (startingLatexExpression) mathField.latex(startingLatexExpression);

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
    <div className="math-quill-editor" style={{ width }}>
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
        className="math-quill-editor__main-input"
        id={id}
        // style={{ width: width ? width : "100%" }}
      />
    </div>
  );
};

export default MathQuillEditor;
