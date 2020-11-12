import React, { createRef, useEffect, useState } from "react";

// import "@json-editor/json-editor/find-and-replace-dialog/jsoneditor";
// @ts-ignore
import { JSONEditor } from "@json-editor/json-editor/dist/nonmin/jsoneditor";

/////// MATH QUILL /////////////
import "mathquill/build/mathquill.css";
import "mathquill/build/mathquill";

import "spectre.css/dist/spectre-icons.min.css";

import "./json-editor-form.scss";

const JSONEditorForm: React.FC = () => {
  const editorEntryPoint: any = createRef();

  const [mathquillEditor, setMathquillEditor] = useState<any>(null);
  const [editorJSON, setEditor] = useState<any>(null);

  useEffect(() => {
    // const htmlElement = document.getElementById("math-quill-entry-point");
    // // @ts-ignore
    // const MQ = window.MathQuill;
    // const config = {
    //   handlers: { edit: function () {} },
    //   restrictMismatchedBrackets: true,
    // };
    // const mathField = MQ.MathField(htmlElement, config);
    // // @ts-ignore
    // console.log(window.MathQuill);
    //
    // mathField.latex("2^{\\frac{3}{2}}"); // Renders the given LaTeX in the MathQuill field
    // setMathquillEditor(mathField);
    // console.log(window.document.getElementById("editor-entry-point"));
    const entry = window.document.getElementById("editor-entry-point");
    // @ts-ignore
    const editor = new JSONEditor(entry, {
      theme: "bootstrap4",
      iconlib: "spectre",
      disable_collapse: true,
      disable_properties: true,
      schema: {
        title: "Создание игры",
        properties: {
          name: {
            type: "string",
            title: "Название игры",
          },
          gameSpace: {
            type: "string",
            title: "Gamespace",
          },
          levels: {
            type: "array",
            format: "table",
            title: "Уровни",
            options: {
              disable_array_delete_last_row: true,
            },
            items: {
              title: "Уровень",
              type: "object",
              properties: {
                name: { type: "string", title: "Название уровня" },
                startingExpression: {
                  type: "string",
                  title: "Исходное выражение",
                },
                goal: {
                  type: "object",
                  title: "Цель уровня",
                  options: {
                    disable_edit_json: true,
                  },
                  properties: {
                    type: {
                      title: "Тип",
                      type: "string",
                      enum: [
                        "Доказательство",
                        "сведение к КНФ/ДНФ",
                        "вычисление",
                        "сокращение дроби",
                      ],
                    },
                    details: {
                      title: "Детали",
                      type: "object",
                      format: "grid",
                      options: {
                        disable_edit_json: true,
                      },
                      properties: {
                        finalExpression: {
                          type: "string",
                          title: "Конечное выражение",
                        },
                        requirements: {
                          type: "string",
                          title: "Требования к КНФ-ДНФ",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      //////// FLAT CONDITIONAL SCHEMA WITH ERRORS /////////
      // schema: {
      //   title: "Payment Method",
      //   oneOf: [
      //     {
      //       title: "Bank EFT",
      //       type: "object",
      //       properties: {
      //         bankName: { title: "Bank name", type: "string" },
      //         routingNumber: { title: "Rounting number", type: "string" },
      //         accountNumber: { title: "Account number", type: "string" },
      //       },
      //       additionalProperties: false,
      //     },
      //     {
      //       title: "Credit Card",
      //       type: "object",
      //       format: "grid",
      //       properties: {
      //         cardType: {
      //           title: "Card type",
      //           type: "string",
      //           enum: ["Amex", "Discover", "MasterCard", "Visa"],
      //         },
      //         cardNumber: {
      //           title: "Card number",
      //           type: "string",
      //           minLength: 15,
      //           maxLength: 16,
      //         },
      //         expiration: {
      //           title: "Expiration month",
      //           type: "string",
      //           format: "month",
      //         },
      //         CCV: {
      //           type: "string",
      //           maxLength: 4,
      //           minLength: 3,
      //           pattern: "[0-9]*",
      //         },
      //       },
      //       additionalProperties: false,
      //     },
      //   ],
      // },
      //////// NESTED CONDITIONAL SCHEMA WITH ERRORS /////////
      // schema: {
      //   properties: {
      //     field: {
      //       title: "Тип уровня",
      //       type: "object",
      //       oneOf: [
      //         {
      //           title: "Ручной",
      //           properties: {
      //             dependent: {
      //               title: "Dependent Field",
      //               readOnly: false,
      //               strictProperties: true,
      //               description: "",
      //               propertyOrder: 1,
      //               type: "string",
      //               options: {
      //                 hidden: false,
      //               },
      //             },
      //           },
      //           additionalProperties: false,
      //           required: ["dependent"],
      //         },
      //         {
      //           title: "Автоматический",
      //           properties: {},
      //           additionalProperties: false,
      //         },
      //       ],
      //     },
      //   },
      // },
    });
    setEditor(editor);

    ////////////////// CUSTOM VALIDATION //////////////////////
    // editor.on("ready", () => {
    //   editor.validate();
    // });
    // editor.on("change", () => {
    //   editor.validator.defaults.custom_validators = [];
    //   editor.validator.defaults.custom_validators.push(
    //     (schema: any, value: any, path: any) => {
    //       const errors = [];
    //       if (value.name === "error") {
    //         errors.push({
    //           path: "root.name",
    //           property: "string",
    //           message: "String should not be error",
    //         });
    //       }
    //       return errors;
    //     }
    //   );
    // });

    const addButton = Array.from(
      document.getElementsByClassName(
        "btn btn-secondary btn-sm json-editor-btn-add json-editor-btntype-add"
      )
    )[1];

    addButton?.addEventListener("click", () => {
      const levelIndex: number = --editor.getValue().levels.length;
      const inputPaths = [
        `root.levels.${levelIndex}.startingExpression`,
        `root.levels.${levelIndex}.goal.details.finalExpression`,
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
          // mathQuillEntryPoint.style.maxWidth = "100%";
          // @ts-ignore
          // console.log(
          //   // @ts-ignore
          //   (document.querySelector(
          //     "[data-schemapath='root.levels.0.originalExpression']"
          //     // @ts-ignore
          //   ).style.width = "10rem !importnant")
          // );
          // @ts-ignore
          const MQ = window.MathQuill.getInterface(2);
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
    <div className="u-container">
      <div id="editor-entry-point" ref={editorEntryPoint}></div>
      <button onClick={() => console.log(editorJSON)}>log</button>
    </div>
  );
};

export default JSONEditorForm;
