import React, { createRef, useEffect, useState } from "react";

// import "@json-editor/json-editor/dist/jsoneditor";
// @ts-ignore
import { JSONEditor } from "@json-editor/json-editor/dist/nonmin/jsoneditor";

/////// MATH QUILL /////////////
import "mathquill/build/mathquill.css";
import "mathquill/build/mathquill";

import "./json-editor-form.scss";

const JSONEditorForm: React.FC = () => {
  const editorEntryPoint: React.Ref<any> = createRef();

  const [mathquillEditor, setMathquillEditor] = useState<any>(null);

  useEffect(() => {
    const htmlElement = document.getElementById("math-quill-entry-point");
    // @ts-ignore
    const MQ = window.MathQuill;
    const config = {
      handlers: { edit: function () {} },
      restrictMismatchedBrackets: true,
    };
    const mathField = MQ.MathField(htmlElement, config);
    // @ts-ignore
    console.log(window.MathQuill);

    mathField.latex("2^{\\frac{3}{2}}"); // Renders the given LaTeX in the MathQuill field
    setMathquillEditor(mathField);
    console.log(window.document.getElementById("editor-entry-point"));
    const entry = window.document.getElementById("editor-entry-point");
    // @ts-ignore
    const editor = new JSONEditor(entry, {
      theme: "bootstrap4",
      schema: {
        title: "New Matify Game",
        type: "object",
        required: [
          "name",
          "age",
          "date",
          "favorite_color",
          "gender",
          "location",
          "pets",
        ],
        properties: {
          game_space: {
            type: "string",
          },
          game_code: {
            type: "string",
          },
          name: {
            type: "string",
          },
          en: {
            type: "string",
          },
          ru: {
            type: "string",
          },
          version: {
            type: "number",
            default: null,
          },
          levels: {
            type: "array",
            format: "tabs",
            title: "Levels",
            items: {
              type: "object",
              title: "Level",
              properties: {
                // type: {
                //   type: "string",
                //   enum: ["cat", "dog", "bird", "reptile", "other"],
                //   default: "dog",
                // },
                levelCode: {
                  type: "string",
                },
                name: {
                  type: "string",
                },
                difficulty: {
                  type: "string",
                },
                type: {
                  type: "string",
                },
                stepsNum: {
                  type: "string",
                },
                time: {
                  type: "string",
                },
                originalExpression: {
                  type: "string",
                },
                finalExpression: {
                  type: "string",
                },
              },
            },
            default: [
              {
                type: "dog",
                name: "Walter",
              },
            ],
          },
          age: {
            type: "integer",
            default: 25,
            minimum: 18,
            maximum: 99,
          },
          favorite_color: {
            type: "string",
            format: "color",
            title: "favorite color",
            default: "#ffa500",
          },
          gender: {
            type: "string",
            enum: ["male", "female", "other"],
          },
          date: {
            type: "string",
            format: "date",
            options: {
              flatpickr: {},
            },
          },
          location: {
            type: "object",
            title: "Location",
            properties: {
              city: {
                type: "string",
                default: "San Francisco",
              },
              state: {
                type: "string",
                default: "CA",
              },
              citystate: {
                type: "string",
                description:
                  "This is generated automatically from the previous two fields",
                template: "{{city}}, {{state}}",
                watch: {
                  city: "location.city",
                  state: "location.state",
                },
              },
            },
          },
          pets: {
            type: "array",
            format: "table",
            title: "Pets",
            uniqueItems: true,
            items: {
              type: "object",
              title: "Pet",
              properties: {
                type: {
                  type: "string",
                  enum: ["cat", "dog", "bird", "reptile", "other"],
                  default: "dog",
                },
                name: {
                  type: "string",
                },
              },
            },
            default: [
              {
                type: "dog",
                name: "Walter",
              },
            ],
          },
        },
      },
    });
  }, []);
  return (
    <div>
      <div id="editor-entry-point" style={{ width: "100%" }}></div>
      <div id="math-quill-entry-point" style={{ width: "100%" }}></div>
      <button
        onClick={() => {
          const input = document.getElementById(
            "root[levels][0][originalExpression]"
          );
          if (input) {
            input.style.display = "none";
            const parent = input.parentElement;
            const htmlElement = document.getElementById(
              "math-quill-entry-point"
            );
            if (parent && htmlElement) {
              parent.appendChild(htmlElement);
            }
          }
        }}
      >
        bind input
      </button>
    </div>
  );
};

export default JSONEditorForm;
