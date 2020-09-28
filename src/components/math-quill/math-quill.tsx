import React, { useEffect, useState } from "react";

import "mathquill/build/mathquill.css";
import "mathquill/build/mathquill";

import "./math-quill.scss";

const MathQuill: React.FC = () => {
  const [editor, setEditor] = useState<any>();

  useEffect(() => {
    var htmlElement = document.getElementById("some_id");
    // @ts-ignore
    var MQ = window.MathQuill.getInterface(2);
    console.log(MQ);
    var config = {
      handlers: { edit: function () {} },
      restrictMismatchedBrackets: true,
    };
    var mathField = MQ.MathField(htmlElement, config);

    mathField.latex("2^{\\frac{3}{2}}"); // Renders the given LaTeX in the MathQuill field
    setEditor(mathField);
  }, []);
  return (
    <div>
      <div id="some_id" />
      <button
        onClick={() => {
          console.log(editor.latex());
        }}
      >
        log
      </button>
    </div>
  );
};

export default MathQuill;
