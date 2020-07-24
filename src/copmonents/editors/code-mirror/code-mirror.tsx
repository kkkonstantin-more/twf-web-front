import React, { createRef, useEffect, useRef, useState } from "react";

// import "codemirror/lib/codemirror";
import "codemirror/mode/javascript/javascript";

import CodeMirror from "codemirror";

import "codemirror/addon/hint/show-hint.css";

import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
import "codemirror/addon/search/search";
import "codemirror/addon/search/matchesonscrollbar.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
// import "codemirror/addon/search/searchcursor.css";
// import "codemirror/addon/search/match-highlighter.css";
// import "codemirror/addon/search/matchesonscrollbar.css";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";

//hints
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint";

import "./code-mirror.scss";

const jsonlint = require("jsonlint-mod");
// @ts-ignore
window["jsonlint"] = jsonlint;

const CodeMirrorEditor: React.FC<{ initialJSON: object }> = ({
  initialJSON,
}) => {
  const [editor, setEditor] = useState<any>(null);

  const entryPoint: React.Ref<any> = useRef();

  useEffect(() => {
    const entryPoint = document.getElementById("entry-point");
    if (entryPoint) {
      const editor = CodeMirror(entryPoint, {
        value: JSON.stringify(initialJSON, null, 2),
        mode: "application/ld+json",
        lineNumbers: true,
        tabSize: 2,
        gutters: ["CodeMirror-lint-markers", "gutter-error"],
        showHint: true,
        lint: true,
        extraKeys: {
          ["Esc"]: "undo",
        },
        matchBrackets: true,
        lineWrapping: true,
        autoCloseBrackets: true,
      });
      editor.markText(
        { line: 5, ch: 5 },
        { line: 7, ch: 15 },
        {
          className: "CodeMirror-lint-mark-error",
          title: "custom error",
        }
      );
      var marker = document.getElementById("myError");
      if (marker) {
        marker.setAttribute("class", "CodeMirror-lint-marker-error");
        marker.setAttribute("data-toggle", "tooltip");
        marker.setAttribute("data-placement", "right");
        marker.setAttribute("title", "Error!");
        marker.setAttribute("id", "myError");
        editor.setGutterMarker(6, "gutter-error", marker);
        setEditor(editor);
        //document.getElementById("myError");
      }
      console.log(editor);
    }
  }, []);

  return (
    <div className="code-mirror">
      <div style={{ height: "70vh" }} ref={entryPoint} id="entry-point" />
      <div id="myError" />
      <div className="code-mirror__actions">
        <h1>actions</h1>
        <button className="btn" onClick={() => editor.undo()}>
          undo (cmd + z)
        </button>
        <button className="btn" onClick={() => editor.redo()}>
          redo (cmd + shift+ z)
        </button>
        <button
          className="btn"
          onClick={() => editor.execCommand("autocomplete")}
        >
          autocomplete
        </button>
        <button className="btn" onClick={() => editor.execCommand("find")}>
          find
        </button>
        <hr />
      </div>
    </div>
  );
};

export default CodeMirrorEditor;
