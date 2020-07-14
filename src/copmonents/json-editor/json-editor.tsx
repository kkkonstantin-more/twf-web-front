import React, { createRef, useEffect, useState } from "react";
// json editor files
import JSONEditor, { JSONEditorOptions } from "jsoneditor";
import "jsoneditor/dist/jsoneditor-minimalist.map";
import "jsoneditor/dist/jsoneditor.min.css";
import "jsoneditor/dist/img/jsoneditor-icons.svg";
// custom styles
import "./json-editor.scss";

interface JSONEditorComponentProps {
  initialJSON: object;
}

const JSONEditorComponent: React.FC<JSONEditorComponentProps> = ({
  initialJSON,
}) => {
  const [editor, setEditor] = useState<any>(null);
  const JSONEditorEntryPoint = createRef<HTMLDivElement>();
  const editorConfig: JSONEditorOptions = {
    modes: ["form", "code", "preview", "text", "tree", "view"],
    schema: {
      type: "object",
      properties: {
        gameSpace: { type: "string" },
        gameCode: { type: "string" },
        name: { type: "string" },
        en: { type: "string" },
        ru: { type: "string" },
        version: { type: "number" },
      },
    },
  };

  useEffect(() => {
    if (JSONEditorEntryPoint.current) {
      setEditor(
        new JSONEditor(JSONEditorEntryPoint.current, editorConfig, initialJSON)
      );
    }
  }, []);

  useEffect(() => {
    if (editor !== null) editor.set(initialJSON);
  }, [initialJSON]);

  return (
    <div>
      <div className="json-editor-component" ref={JSONEditorEntryPoint} />
      <button
        className="btn"
        onClick={() => {
          console.log(editor.get());
        }}
      >
        Get json
      </button>
    </div>
  );
};

export default JSONEditorComponent;
