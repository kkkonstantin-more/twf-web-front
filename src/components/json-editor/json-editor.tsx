import React, { createRef, useEffect, useState } from "react";
// json editor files
import JSONEditor, { JSONEditorOptions, ValidationError } from "jsoneditor";
import "jsoneditor/dist/jsoneditor-minimalist.map";
import "jsoneditor/dist/jsoneditor.min.css";
import "jsoneditor/dist/img/jsoneditor-icons.svg";
// ace editor files
import "ace-builds/src-min-noconflict/ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-min-noconflict/mode-json";
import "ace-builds/src-min-noconflict/theme-github";

import "./json-editor.scss";

// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-javascript";

interface JSONEditorComponentProps {
  initialJSON: object;
}

const JSONEditorComponent: React.FC<JSONEditorComponentProps> = ({
  initialJSON,
}) => {
  const [editor, setEditor] = useState<any>(null);
  const JSONEditorEntryPoint = createRef<HTMLDivElement>();
  const editorConfig: JSONEditorOptions = {
    modes: ["code"],
    schema: {
      type: "object",
      properties: {
        gameSpace: { type: "string", minLength: 10 },
        gameCode: { type: "string" },
        name: { type: "string" },
        en: { type: "string" },
        ru: { type: "string" },
        version: { type: "number" },
      },
    },
    onValidate: (json) => {
      const errors: ValidationError[] = [];
      if (!json.gameSpace) {
        errors.push({
          path: ["gameSpace"],
          message: 'Required property "gameSpace" missing.',
        });
      }
      json.levels.forEach((level: any, i: number) => {
        if (!level.levelCode.includes("_")) {
          errors.push({
            path: ["levels", i, "levelCode"],
            message: '"LevelCode" should contain "_".',
          });
        }
      });
      return errors;
    },
    autocomplete: {
      filter: "start",
      getOptions: (text) => {
        if (text === "ap") return ["apple", "app"];
        else return null;
      },
    },
  };

  useEffect(() => {
    if (JSONEditorEntryPoint.current) {
      setEditor(
        new JSONEditor(JSONEditorEntryPoint.current, editorConfig, initialJSON)
      );
    }
    // const editor = ace.edit("editor");
    // editor.setOptions({
    //   mode: "ace/mode/json",
    //   selectionStyle: "text",
    //   theme: "ace/theme/github",
    //   // enableBasicAutocompletion: true,
    //   // enableSnippets: true,
    //   // enableLiveAutoCompletion: true,
    // });
    // editor.session.setValue(JSON.stringify(initialJSON, null, 2));
    // setEditor(editor);
  }, []);

  useEffect(() => {
    if (editor !== null) {
      // editor.session.setValue(JSON.stringify(initialJSON, null, 2));
      editor.set(initialJSON);
    }
  }, [initialJSON]);

  return (
    <div>
      <div
        className="json-editor-component"
        id="editor"
        ref={JSONEditorEntryPoint}
      />
      {/*<AceEditor theme="github" />*/}
      <button
        className="btn"
        onClick={() => {
          console.log(editor);
          editor.aceEditor.execCommand("find");
          // console.log(editor.get());
          // editor.setMode("tree");
          // const copy = { ...editor };
          // copy.mode = "tree";
          // console.log(copy);
          /////// GET UNDO MANAGER //////////
          // if (editor.getMode() === "code") {
          //   console.log(editor.aceEditor.getSession().$undoManager);
          // }
          ///////////////////////////////////
          /////// TOGGLE FIND WINDOW ////////
          // editor.aceEditor.execCommand("find");
          //////////////////////////////////
          // editor.aceEditor.setOption({
          //   enableBasicAutocompletion: true,
          // });
          // console.log(editor.aceEditor.commands);
          // editor.aceEditor;
          // var editor = ace.edit("editor");
          // console.log(editor.getSession());
          // console.log(editor.getSession().getAnnotations());
          // console.log(editor.getValue());
        }}
      >
        log data
      </button>
    </div>
  );
};

export default JSONEditorComponent;
