import React, { createRef, useEffect, useState } from "react";

// import "@json-editor/json-editor/dist/jsoneditor";
// @ts-ignore
import { JSONEditor } from "@json-editor/json-editor/dist/nonmin/jsoneditor";

/////// MATH QUILL /////////////
import "mathquill/build/mathquill.css";
import "mathquill/build/mathquill";

import "./json-editor-form.scss";

const JSONEditorForm: React.FC = () => {
  const editorEntryPoint: any = createRef();

  const [mathquillEditor, setMathquillEditor] = useState<any>(null);
  const [editorJSON, setEditor] = useState<any>(null);

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
        // required: [
        //   "name",
        //   "age",
        //   "date",
        //   "favorite_color",
        //   "gender",
        //   "location",
        //   "pets",
        // ],
        properties: {
          game_space: {
            type: "string",
          },
          game_code: {
            type: "string",
          },
          name: {
            type: "string",
            minLength: 5,
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
            format: "table",
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
            // default: [
            //   {
            //     type: "dog",
            //     name: "Walter",
            //   },
            // ],
          },
          // age: {
          //   type: "integer",
          //   default: 25,
          //   minimum: 18,
          //   maximum: 99,
          // },
          // favorite_color: {
          //   type: "string",
          //   format: "color",
          //   title: "favorite color",
          //   default: "#ffa500",
          // },
          // gender: {
          //   type: "string",
          //   enum: ["male", "female", "other"],
          // },
          // date: {
          //   type: "string",
          //   format: "date",
          //   options: {
          //     flatpickr: {},
          //   },
          // },
          // location: {
          //   type: "object",
          //   title: "Location",
          //   properties: {
          //     city: {
          //       type: "string",
          //       default: "San Francisco",
          //     },
          //     state: {
          //       type: "string",
          //       default: "CA",
          //     },
          //     citystate: {
          //       type: "string",
          //       description:
          //         "This is generated automatically from the previous two fields",
          //       template: "{{city}}, {{state}}",
          //       watch: {
          //         city: "location.city",
          //         state: "location.state",
          //       },
          //     },
          //   },
          // },
          // pets: {
          //   type: "array",
          //   format: "table",
          //   title: "Pets",
          //   uniqueItems: true,
          //   items: {
          //     type: "object",
          //     title: "Pet",
          //     properties: {
          //       type: {
          //         type: "string",
          //         enum: ["cat", "dog", "bird", "reptile", "other"],
          //         default: "dog",
          //       },
          //       name: {
          //         type: "string",
          //       },
          //     },
          //   },
          //   default: [
          //     {
          //       type: "dog",
          //       name: "Walter",
          //     },
          //   ],
          // },
        },
      },
    });
    setEditor(editor);

    // const entryNode = document.querySelector(
    //   "[data-schemapath='root.levels'] > div > table > tbody"
    // );
    // const observer = new MutationObserver((mutationRecord, observer) => {
    //   const input = document.querySelector(
    //     "[data-schemapath='root.levels.0.originalExpression'] > .form-group > input"
    //   );
    //   console.log(input);
    // });
    // console.log(entryNode);
    // if (entryNode) {
    //   observer.observe(entryNode, { childList: true, subtree: true });
    // }

    const addButton: Element | undefined = Array.from(
      document.getElementsByClassName(
        "btn btn-secondary btn-sm json-editor-btn-add json-editor-btntype-add"
      )
    ).find((element: Element) => {
      return element?.firstElementChild?.innerHTML === "Add Level";
    });

    addButton?.addEventListener("click", () => {
      const levelIndex: number = --editor.getValue().levels.length;
      const inputPaths = [
        `root.levels.${levelIndex}.originalExpression`,
        `root.levels.${levelIndex}.finalExpression`,
      ];
      const inputs: HTMLInputElement[] | null[] = inputPaths.map(
        (path: string) => {
          return document.querySelector(
            `[data-schemapath='${path}'] > .form-group > input`
          ) as HTMLInputElement;
        }
      );
      if (inputs.every((input: HTMLInputElement | null) => input)) {
        inputs.forEach((input: HTMLInputElement, i: number) => {
          input.style.display = "none";
          const inputContainer: Element | null = input.parentElement;
          const mathQuillEntryPoint = document.createElement("div");
          mathQuillEntryPoint.style.width = "100%";
          // @ts-ignore
          const MQ = window.MathQuill;
          const mathQuillInput = MQ.MathField(mathQuillEntryPoint);
          mathQuillInput.config({
            handlers: {
              edit() {
                const originalExpression = editor.getEditor(inputPaths[i]);
                originalExpression.setValue(mathQuillInput.latex());
              },
            },
          });
          if (inputContainer && mathQuillEntryPoint) {
            inputContainer.appendChild(mathQuillEntryPoint);
          }
        });
      }

      // const input: HTMLInputElement | null = document.querySelector(
      //   "[data-schemapath='root.levels.0.originalExpression'] > .form-group > input"
      // );
      // if (input) {
      //   input.style.display = "none";
      //   const inputContainer: Element | null = input.parentElement;
      //   const mathQuillEntryPoint = document.createElement("div");
      //   mathQuillEntryPoint.style.width = "100%";
      //   // @ts-ignore
      //   const MQ = window.MathQuill;
      //   const mathQuillInput = MQ.MathField(mathQuillEntryPoint);
      //   mathQuillInput.config({
      //     handlers: {
      //       edit() {
      //         const originalExpression = editor.getEditor(
      //           "root.levels.0.originalExpression"
      //         );
      //         originalExpression.setValue(mathQuillInput.latex());
      //       },
      //     },
      //   });
      //   // console.log(mathQuillInput.config);
      //   if (inputContainer && mathQuillEntryPoint) {
      //     inputContainer.appendChild(mathQuillEntryPoint);
      //   }
      // console.log(mathQuillInput.ty);
      // }
    });

    // addButton?.addEventListener("click", () => {
    //   setTimeout(() => {
    //     const input = document.getElementById(
    //       "root[levels][0][originalExpression]"
    //     );
    //     console.log(input);
    //   }, 10);
    // new Promise((resolve, reject) => {
    //   const input = document.getElementById(
    //     "root[levels][0][originalExpression]"
    //   );
    //   resolve(input);
    // }).then((input) => console.log(input));

    // });
    // const addButton: HTMLElement | null = document.getElementById("btn");
    // console.log(addButton);
    // console.log(addButton);
    // addButton.onclick = function () {};
    // const input = document.getElementById(
    //   "root[levels][0][originalExpression]"
    // );
    // if (input) {
    //   input.style.display = "none";
    //   const parent = input.parentElement;
    //   const htmlElement = document.getElementById("math-quill-entry-point");
    //   if (parent && htmlElement) {
    //     parent.appendChild(htmlElement);
    //   }
    // }
  }, []);
  return (
    <div>
      <div
        id="editor-entry-point"
        ref={editorEntryPoint}
        style={{ width: "95vw" }}
      ></div>
      <div id="math-quill-entry-point" style={{ width: "100%" }}></div>
      <button
        id="btn"
        onClick={() => {
          const input = document.getElementById(
            "root[levels][0][finalExpression]"
          ) as HTMLInputElement;
          if (input) {
            // console.log(editorJSON.getEditor("root.levels"));
            // input.value = "5";
            // console.log(input);
            // console.log(input.value);
          }
        }}
      >
        bind input
      </button>
    </div>
  );
};

export default JSONEditorForm;
