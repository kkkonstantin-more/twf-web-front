// libs and hooks
import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "codemirror";
// redux
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectNamespaceJSON,
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../../redux/constructor-jsons/constructor-jsons.actions";
// codemirror core addons
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/search/search";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/matchesonscrollbar.css";
import "codemirror/addon/display/panel";
// codemirror third-party addons
import "codemirror-find-and-replace-dialog/dist/search.js";
import "codemirror-find-and-replace-dialog/dist/dialog.js";
import "codemirror-find-and-replace-dialog/dist/dialog.css";
// codemirror hints/lints
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
// types
import { Dispatch } from "react";
import { ConstructorJSONsActionTypes } from "../../../redux/constructor-jsons/constructor-jsons.types";
import { NamespaceConstructorInputs } from "../../../constructors/namespace-constructor/namespace-constructor.types";
import { ConstructorType } from "../../../pages/constructor-page/constructor-page.types";
import { RootState } from "../../../redux/root-reducer";
import { RulePackConstructorInputs } from "../../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { TaskSetConstructorInputs } from "../../../constructors/task-set-constructor/task-set-constructor.types";
// styles
import "./code-mirror.scss";

// codemirror config
const jsonlint = require("jsonlint-mod");
// @ts-ignore
window["jsonlint"] = jsonlint;

export interface CodeMirrorProps {
  constructorType: ConstructorType;
}

const CodeMirrorEditor = ({
  constructorType,
  rulePackJSON,
  namespaceJSON,
  taskSetJSON,
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
}: CodeMirrorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const entryPoint: React.Ref<any> = useRef();

  const currentJSON = (() => {
    switch (constructorType) {
      case "namespace":
        return namespaceJSON;
      case "rulePack":
        return rulePackJSON;
      case "taskSet":
        return taskSetJSON;
    }
  })();

  const updateCurrentJSON = (() => {
    switch (constructorType) {
      case "namespace":
        return updateNamespaceJSON;
      case "rulePack":
        return updateRulePackJSON;
      case "taskSet":
        return updateTaskSetJSON;
    }
  })();

  useEffect(() => {
    const entryPoint = document.getElementById("entry-point");
    if (entryPoint) {
      const editor = CodeMirror(entryPoint, {
        value: JSON.stringify(currentJSON, null, 2),
        mode: "application/ld+json",
        lineNumbers: true,
        tabSize: 2,
        gutters: ["CodeMirror-lint-markers", "gutter-error"],
        showHint: true,
        lint: true,
        // extraKeys: {
        //   ["Esc"]: "undo",
        // },
        matchBrackets: true,
        lineWrapping: true,
        autoCloseBrackets: true,
      });
      // editor.markText(
      //   { line: 5, ch: 5 },
      //   { line: 7, ch: 15 },
      //   {
      //     className: "CodeMirror-lint-mark-error",
      //     title: "custom error",
      //   }
      // );
      editor.on("change", () => {
        updateCurrentJSON(JSON.parse(editor.getValue()));
      });
      setEditor(editor);
      //   var marker = document.getElementById("myError");
      //   if (marker) {
      //     marker.setAttribute("class", "CodeMirror-lint-marker-error");
      //     marker.setAttribute("data-toggle", "tooltip");
      //     marker.setAttribute("data-placement", "right");
      //     marker.setAttribute("title", "Error!");
      //     marker.setAttribute("id", "myError");
      //     editor.setGutterMarker(6, "gutter-error", marker);
      //     setEditor(editor);
      //     //document.getElementById("myError");
      //   }
    }
  }, []);

  return (
    <div className="code-mirror">
      <div
        style={{ height: "70vh", width: "100%", marginLeft: "2rem" }}
        ref={entryPoint}
        id="entry-point"
      />
      {/*<div id="myError" />*/}
      {/*<div className="code-mirror__actions">*/}
      {/*  <h1>actions</h1>*/}
      {/*  /!*<button className="btn" onClick={() => editor.undo()}>*!/*/}
      {/*  /!*  undo (cmd + z)*!/*/}
      {/*  /!*</button>*!/*/}
      {/*  /!*<button className="btn" onClick={() => editor.redo()}>*!/*/}
      {/*  /!*  redo (cmd + shift+ z)*!/*/}
      {/*  /!*</button>*!/*/}
      {/*  /!*<button*!/*/}
      {/*  /!*  className="btn"*!/*/}
      {/*  /!*  onClick={() => editor.execCommand("autocomplete")}*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  autocomplete*!/*/}
      {/*  /!*</button>*!/*/}
      {/*  /!*<button className="btn" onClick={() => editor.execCommand("find")}>*!/*/}
      {/*  /!*  find*!/*/}
      {/*  /!*</button>*!/*/}
      {/*  <button onClick={() => editor.setValue(JSON.stringify(namespaceJSON))}>*/}
      {/*    update text*/}
      {/*  </button>*/}
      {/*  <button onClick={() => console.log(editor.doc.getHistory())}>*/}
      {/*    log history*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      editor.replaceRange("lalal", { line: 1, ch: 5 });*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    change line*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    onClick={() => {*/}
      {/*      console.log(editor.getSearchCursor("game").replace("12"));*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    find gameSpace*/}
      {/*  </button>*/}
      {/*  <hr />*/}
      {/*  <input*/}
      {/*    type="text"*/}
      {/*    value={inputValue}*/}
      {/*    onChange={(e) => {*/}
      {/*      setInputValue(e.target.value);*/}
      {/*      const { start, end } = editor.getLineTokens(1)[4];*/}
      {/*      editor.replaceRange(*/}
      {/*        `"${e.target.value}"`,*/}
      {/*        {*/}
      {/*          line: 1,*/}
      {/*          ch: start,*/}
      {/*        },*/}
      {/*        {*/}
      {/*          line: 1,*/}
      {/*          ch: end,*/}
      {/*        }*/}
      {/*      );*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  RootState,
  {
    namespaceJSON: NamespaceConstructorInputs;
    rulePackJSON: RulePackConstructorInputs;
    taskSetJSON: TaskSetConstructorInputs;
  }
>({
  namespaceJSON: selectNamespaceJSON,
  rulePackJSON: selectRulePackJSON,
  taskSetJSON: selectTaskSetJSON,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ConstructorJSONsActionTypes>
) => ({
  updateNamespaceJSON: (namespaceJSON: NamespaceConstructorInputs) => {
    return dispatch(updateNamespaceJSON(namespaceJSON));
  },
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) => {
    return dispatch(updateTaskSetJSON(taskSetJSON));
  },
  updateRulePackJSON: (rulePackJSON: RulePackConstructorInputs) => {
    return dispatch(updateRulePackJSON(rulePackJSON));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CodeMirrorEditor);
