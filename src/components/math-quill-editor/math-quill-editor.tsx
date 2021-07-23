// libs and hooks
import React, { useEffect, useState } from "react";
import { v4 as uidv4 } from "uuid";
// @ts-ignore
import jQuery from "jquery";
//@ts-ignore
import MQ from "../../local-libs/math-quill";
// style
import "./math-quill-editor.scss";
// @ts-ignore
window.jQuery = jQuery;

interface MathQuillEditorProps {
  inputRef?: React.RefObject<HTMLInputElement>;
  config?: any;
  width?: string;
  maxWidth?: string;
  startingLatexExpression?: string;
  enableOutput?: boolean;
  showOperationTab?: boolean;
  updateValue?: (value: string) => void;
  isInvalid?: boolean;
  onBlur?: (value: string) => void;
}

// TODO: add support for edit function

const MathQuillEditor: React.FC<MathQuillEditorProps> = ({
  config,
  startingLatexExpression,
  showOperationTab = true,
  inputRef,
  width,
  maxWidth,
  updateValue,
  isInvalid,
  onBlur,
}: MathQuillEditorProps) => {
  if (inputRef && inputRef.current) {
    inputRef.current.style.display = "none";
  }
  const [editor, setEditor] = useState<any>();
  // generating unique id by uuid library
  const id = uidv4();

  useEffect(() => {
    const htmlElement = document.getElementById(id);
    MQ();
    // @ts-ignore
    const MathQuill = window.MathQuill.getInterface(2);
    const mathField = config
      ? MathQuill.MathField(htmlElement, config)
      : MathQuill.MathField(htmlElement);

    // if (config && config.handlers) {
    //   mathField.config({
    //     ...config,
    //     handlers: {
    //       ...config.handlers,
    //       edit: function () {
    //         // edit function initialized for the first time
    //         if (config.handlers.fns && config.handlers.fns.edit) {
    //           config.handlers.fns.edit();
    //         }
    //         // edit function is already initialized
    //         // if (config.handlers.edit) {
    //         //   config.handlers.edit();
    //         // }
    //         if (inputRef.current) {
    //           inputRef.current.value = mathField.latex();
    //         }
    //       },
    //     },
    //   });
    // } else if (config) {
    //   mathField.config({
    //     ...config,
    //     handlers: {
    //       edit: function () {
    //         if (inputRef.current) {
    //           inputRef.current.value = mathField.latex();
    //         }
    //       },
    //     },
    //   });
    // } else {
    //   mathField.config({
    //     spaceBehavesLikeTab: true,
    //     handlers: {
    //       edit: function () {
    //         if (inputRef.current) {
    //           inputRef.current.value = mathField.latex();
    //         }
    //         if (updateValue) {
    //           updateValue(mathField.latex());
    //         }
    //       },
    //     },
    //   });
    // }

    mathField.config({
      ...config,
      spaceBehavesLikeTab: true,
      handlers: {
        edit: function () {
          if (inputRef && inputRef.current) {
            inputRef.current.value = mathField.latex();
          }
          if (updateValue) {
            updateValue(mathField.latex());
          }
        },
      },
    });

    if (startingLatexExpression) {
      mathField.latex(startingLatexExpression);
    }

    setEditor(mathField);

    if (htmlElement && onBlur) {
      htmlElement.firstChild?.addEventListener("focusout", () => {
        onBlur(mathField.latex());
      });
    }
  }, []);

  const actions: { iconUrl: string; latexCmd: string }[] = [
    {
      iconUrl: require("../../assets/math-symbols/sum.svg").default,
      latexCmd: "\\sum",
    },
    {
      iconUrl: require("../../assets/math-symbols/square-root.svg").default,
      latexCmd: "\\sqrt",
    },
    {
      iconUrl: require("../../assets/math-symbols/pi.svg").default,
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
        style={{ width, minWidth: "17rem" }}
      />
    </div>
  );
};

export default MathQuillEditor;
