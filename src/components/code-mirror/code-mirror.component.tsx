// libs and hooks
import React, { useEffect, useRef, useState } from "react";
import CodeMirror, { Position, TextMarker } from "codemirror";
import { v4 as uidv4 } from "uuid";
// redux
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectNamespaceJSON,
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.actions";
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
import "./overrides/find-and-replace-dialog/search.js";
import "./overrides/find-and-replace-dialog/dialog.js";
import "./overrides/find-and-replace-dialog/dialog.css";
// codemirror hints/lints
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/lint.css";
// types
import { Dispatch } from "react";
import { ConstructorJSONsActionTypes } from "../../redux/constructor-jsons/constructor-jsons.types";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { ConstructorType } from "../../pages/constructor-page/constructor-page.types";
import { RootState } from "../../redux/root-reducer";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
// styles
import "./code-mirror.styles.scss";
import {
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
import ActionButton from "../action-button/action-button.component";
import { mdiFindReplace, mdiMagnify } from "@mdi/js";
import { ActionButtonProps } from "../action-button/action-button.types";
import {
  addItemToTaskSetHistory,
  redoTaskSetHistory,
  undoTaskSetHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import { ConstructorHistoryItem } from "../../redux/constructor-history/constructor-history.types";
import { selectCurrentTaskSetHistoryChange } from "../../redux/constructor-history/constructor-history.selectors";
// jsonlint config
const jsonlint = require("jsonlint-mod");
// @ts-ignore
window["jsonlint"] = jsonlint;

export interface CodeMirrorProps {
  constructorType: ConstructorType;
}

export interface CodeMirrorWordPosition {
  from: Position;
  to: Position;
}

enum CMErrorType {
  EXCESSIVE_PROP = "excessive prop",
  INVALID_EXP = "invalid expression",
  WRONG_EXP_FORMAT = "wrong expression format",
}

interface CMError {
  type: CMErrorType;
  position: CodeMirrorWordPosition;
  gutterId: string;
}

const CodeMirrorEditor = ({
  constructorType,
  rulePackJSON,
  namespaceJSON,
  taskSetJSON,
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
  currentHistoryChange,
  undo,
  redo,
  addItemToHistory,
}: CodeMirrorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);
  const [dynamicErrors, setDynamicErrors] = useState<CMError[]>([]);
  let errors: CMError[] = [];

  const entryPoint: React.Ref<any> = useRef();

  const currentReduxJSON = (() => {
    switch (constructorType) {
      case "namespace":
        return namespaceJSON;
      case "rulePack":
        return rulePackJSON;
      case "taskSet":
        return taskSetJSON;
    }
  })();

  const initialReduxJSON = (() => {
    switch (constructorType) {
      case "namespace":
        return CONSTRUCTOR_JSONS_INITIAL_STATE.namespace;
      case "rulePack":
        return CONSTRUCTOR_JSONS_INITIAL_STATE.rulePack;
      case "taskSet":
        return CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet;
    }
  })();

  const updateCurrentReduxJSON = (() => {
    switch (constructorType) {
      case "namespace":
        return updateNamespaceJSON;
      case "rulePack":
        return updateRulePackJSON;
      case "taskSet":
        return updateTaskSetJSON;
    }
  })();

  const getWordPositions = (
    editor: CodeMirror.Editor,
    word: string,
    findOne?: boolean,
    specificLine?: number,
    withParentheses: boolean = false
  ): CodeMirrorWordPosition[] | CodeMirrorWordPosition | undefined => {
    // initializing cursor at the start of the document
    // @ts-ignore *getSearchCursor method is an addon and not type checked in original CodeMirror
    const cursor = editor.getSearchCursor(
      withParentheses ? `"${word}"` : word,
      { line: specificLine ? specificLine : 0, ch: 0 },
      {
        caseFold: true,
        multiline: true,
      }
    );
    const wordPositions: CodeMirrorWordPosition[] = [];
    cursor.find();
    while (cursor.from() && cursor.to()) {
      if (specificLine) {
        if (cursor.from().line === specificLine) {
          return {
            from: cursor.from(),
            to: cursor.to(),
          };
        } else {
          return;
        }
      } else {
        wordPositions.push({
          from: cursor.from(),
          to: cursor.to(),
        });
      }
      cursor.findNext();
    }
    if (wordPositions.length === 0) return undefined;
    return wordPositions;
  };

  // TODO: refactor function, remove inner function, make it clean
  const getExcessiveProps = (doc: string): string[] => {
    try {
      JSON.parse(doc);
    } catch {
      return [];
    }
    const excessiveProps: string[] = [];
    const addExcessiveProps = (editorValue: any, initialValue: any) => {
      const editorProps = Object.keys(editorValue);
      const allowedProps = Object.keys(initialValue);
      editorProps.forEach((prop: string) => {
        if (!allowedProps.includes(prop)) {
          excessiveProps.push(prop);
        } else if (
          Array.isArray(editorValue[prop]) &&
          Array.isArray(initialValue[prop]) &&
          editorValue[prop].length !== 0 &&
          initialValue[prop].length !== 0
        ) {
          editorValue[prop].forEach((value: any) => {
            addExcessiveProps(value, initialValue[prop][0]);
          });
        } else if (typeof editorValue[prop] === "object") {
          addExcessiveProps(editorValue[prop], initialValue[prop]);
        }
      });
    };
    addExcessiveProps(JSON.parse(doc), initialReduxJSON);
    return excessiveProps;
  };

  const setErrorLineAndGutter = (
    editor: CodeMirror.Editor,
    wordPosition: CodeMirrorWordPosition,
    msg: string,
    errorType: CMErrorType
  ): void => {
    const { from, to } = wordPosition;
    editor.markText(from, to, {
      className: "CodeMirror-lint-mark-error",
      title: msg,
    });
    const marker: HTMLDivElement = document.createElement("div");
    marker.setAttribute("class", "CodeMirror-lint-marker-error");
    marker.setAttribute("data-toggle", "tooltip");
    marker.setAttribute("data-placement", "right");
    marker.setAttribute("title", msg);
    const id = uidv4();
    marker.setAttribute("id", id);
    editor.setGutterMarker(from.line, "gutter-error", marker);

    errors = [
      ...errors.filter((error: CMError) => {
        return (
          error.position.from.line !== from.line &&
          error.position.to.line !== to.line
        );
      }),
      {
        type: errorType,
        gutterId: id,
        position: wordPosition,
      },
    ];
    setDynamicErrors(errors);
  };

  const destroyAllErrors = (editor: CodeMirror.Editor): void => {
    editor.clearGutter("gutter-error");
    editor.getAllMarks().forEach((mark: TextMarker) => {
      mark.clear();
    });
  };

  // TODO: refactor function, remove inner function, make it clean
  const getAllExpressions = (
    editor: CodeMirror.Editor
  ): { format: string; expression: string }[] => {
    const editorObj = JSON.parse(editor.getValue());
    const expressions: { format: string; expression: string }[] = [];
    const appendExpressions = (obj: any) => {
      if (typeof obj === "object") {
        if (obj.hasOwnProperty("format") && obj.hasOwnProperty("expression")) {
          expressions.push({
            format: obj.format,
            expression: obj.expression,
          });
        } else {
          Object.keys(obj).forEach((prop: string) => {
            if (typeof obj[prop] === "object") {
              if (
                obj[prop].hasOwnProperty("format") &&
                obj[prop].hasOwnProperty("expression")
              ) {
                expressions.push({
                  format: obj[prop].format,
                  expression: obj[prop].expression,
                });
              } else {
                appendExpressions(obj[prop]);
              }
            }
          });
        }
      }
    };
    appendExpressions(editorObj);
    return expressions;
  };

  const destroyError = (error: CMError, editor: CodeMirror.Editor) => {
    const marker = document.getElementById(error.gutterId);
    marker?.parentNode?.removeChild(marker);
    editor.getAllMarks().forEach((mark: TextMarker) => {
      if (
        // @ts-ignore
        mark.lines[0].lineNo() === error.position.from.line &&
        // @ts-ignore
        mark.lines[0].markedSpans[0].from === error.position.from.ch
      ) {
        mark.clear();
      }
    });
    errors = errors.filter((prevStateError: CMError) => {
      return (
        prevStateError.position.from.line !== error.position.from.line &&
        prevStateError.position.from.ch !== error.position.from.ch &&
        prevStateError.position.to.line !== error.position.to.line &&
        prevStateError.position.to.ch !== error.position.to.ch
      );
    });
    setDynamicErrors(errors);
  };

  const checkActiveErrors = (editor: CodeMirror.Editor) => {
    // active errors checking
    if (errors.length !== 0) {
      const excessiveProps = getExcessiveProps(editor.getValue());
      const expressions = getAllExpressions(editor);
      errors.forEach((error: CMError) => {
        if (error.type === CMErrorType.EXCESSIVE_PROP) {
          if (
            excessiveProps.every((excessiveProp: string) => {
              const excessivePropOnCurrentLine = getWordPositions(
                editor,
                excessiveProp,
                true,
                error.position.from.line,
                true
              );
              console.log(error, excessivePropOnCurrentLine);
              return !excessivePropOnCurrentLine;
            })
          ) {
            console.log("Error destroyed");
            destroyError(error, editor);
          } else {
            console.log("ERROR FOUND");
          }
        } else if (error.type === CMErrorType.WRONG_EXP_FORMAT) {
          if (
            expressions.every((expression) => {
              const formatOnCurrentLine = getWordPositions(
                editor,
                expression.format,
                true,
                error.position.from.line,
                true
              );
              return (
                formatOnCurrentLine === undefined ||
                expression.format === MathInputFormat.PLAIN_TEXT ||
                expression.format === MathInputFormat.STRUCTURE_STRING ||
                expression.format === MathInputFormat.TEX
              );
            })
          ) {
            destroyError(error, editor);
          }
        } else if (error.type === CMErrorType.INVALID_EXP) {
          if (
            expressions.every((expression) => {
              const expressionOnCurrentLine = getWordPositions(
                editor,
                expression.expression,
                true,
                error.position.from.line,
                true
              );
              if (expressionOnCurrentLine === undefined) {
                return true;
              } else {
                return (
                  (expression.format === MathInputFormat.PLAIN_TEXT ||
                    expression.format === MathInputFormat.STRUCTURE_STRING ||
                    expression.format === MathInputFormat.TEX) &&
                  getErrorFromMathInput(
                    expression.format as MathInputFormat,
                    expression.expression
                  ) === null
                );
              }
            })
          ) {
            destroyError(error, editor);
          }
        }
      });
    }
  };

  const removeNotActualGutters = (errors: CMError[]): void => {
    Array.from(
      document.querySelectorAll("div .CodeMirror-lint-marker-error")
    ).forEach((element: Element) => {
      console.log(element.id);
      console.log(errors);
      if (
        !errors.some((error: CMError) => {
          return error.gutterId === element.id;
        })
      ) {
        element?.parentNode?.removeChild(element);
      }
    });
  };

  const checkExcessivePropInLine = (
    editor: CodeMirror.Editor,
    excessiveProps: string[],
    line: number
  ) => {
    excessiveProps.forEach((excessiveProp: string) => {
      const excessivePropOnCurrentLinePos = getWordPositions(
        editor,
        excessiveProp,
        true,
        line,
        true
      );
      if (
        excessivePropOnCurrentLinePos &&
        !Array.isArray(excessivePropOnCurrentLinePos)
      ) {
        setErrorLineAndGutter(
          editor,
          excessivePropOnCurrentLinePos,
          "unexpected property",
          CMErrorType.EXCESSIVE_PROP
        );
      }
    });
  };

  useEffect(() => {
    if (editor && currentHistoryChange) {
      const cursorPos = editor.getCursor();
      const setToValue = (obj: any, value: any, path: any) => {
        let i;
        path = path.split(".");
        for (i = 0; i < path.length - 1; i++) {
          obj = obj[path[i]];
        }
        obj[path[i]] = value;
      };
      const newEditorVal = JSON.parse(editor.getValue());
      setToValue(
        newEditorVal,
        currentHistoryChange.value,
        currentHistoryChange.propertyPath.replace("[", ".").replace("]", "")
      );
      editor.setValue(JSON.stringify(newEditorVal, null, 2));
      editor.setCursor(cursorPos);
    }
  }, [currentHistoryChange]);

  useEffect(() => {
    if (entryPoint.current) {
      const editor = CodeMirror(entryPoint.current, {
        value: JSON.stringify(currentReduxJSON, null, 2),
        mode: "application/ld+json",
        lineNumbers: true,
        tabSize: 2,
        gutters: ["CodeMirror-lint-markers", "gutter-error"],
        showHint: true,
        lint: true,
        matchBrackets: true,
        lineWrapping: true,
        autoCloseBrackets: true,
      });

      editor.undo = () => {
        undo();
      };
      editor.redo = () => {
        redo();
      };

      editor.on("changes", (editor, changes) => {
        // console.log(editor);
        // changes.forEach((change: any) => {
        //   checkExcessivePropInLine(
        //     editor,
        //     getExcessiveProps(editor.getValue()),
        //     change.from.line
        //   );
        // });
      });

      editor.on("change", (editor, changeObject) => {
        console.log(changeObject);
        if (changeObject.origin === "+input") {
          const [oldExp, oldVal] = (
            editor
              .getLine(changeObject.from.line)
              .slice(0, changeObject.from.ch) +
            editor.getLine(changeObject.from.line).slice(changeObject.to.ch + 1)
          )
            .split(":")
            .map((item: string) => {
              return item.replace(/\"|\,/g, "").trim();
            });

          const [newExp, newVal] = editor
            .getLine(changeObject.from.line)
            .split(":")
            .map((item: string) => {
              return item.replace(/\"|\,/g, "").trim();
            });

          const getPositions = (
            query: string,
            start: Position,
            end: Position
          ) => {
            const res: CodeMirrorWordPosition[] = [];
            // @ts-ignore
            const cursor = editor.getSearchCursor(query, start);
            cursor.find();
            while (
              cursor.from() &&
              cursor.to() &&
              cursor.from().line <= end.line
            ) {
              res.push({
                from: cursor.from(),
                to: cursor.to(),
              });
              cursor.findNext();
            }
            return res;
          };

          const openingBrackets = getPositions(
            "[",
            { line: 1, ch: 0 },
            changeObject.from
          );
          const closingBrackets = getPositions(
            "]",
            { line: 1, ch: 0 },
            changeObject.from
          );

          const openingCurlyBraces = getPositions(
            "{",
            { line: 1, ch: 0 },
            changeObject.from
          );
          const closingCurlyBraces = getPositions(
            "}",
            { line: 1, ch: 0 },
            changeObject.from
          );

          interface Bracket {
            char: "{" | "[" | "}" | "]";
            position: CodeMirrorWordPosition;
          }

          const brackets: Bracket[] = [];
          let searchLine = 1;
          while (searchLine < changeObject.from.line) {
            const lineValue = editor.getLine(++searchLine);
            if (lineValue.includes("{")) {
              brackets.push({
                char: "{",
                position: getPositions(
                  "{",
                  { line: searchLine, ch: 0 },
                  { line: searchLine, ch: 999 }
                )[0],
              });
            } else if (lineValue.includes("[")) {
              brackets.push({
                char: "[",
                position: getPositions(
                  "[",
                  { line: searchLine, ch: 0 },
                  { line: searchLine, ch: 999 }
                )[0],
              });
            } else if (lineValue.includes("}")) {
              if (brackets[brackets.length - 1].char === "{") {
                brackets.pop();
              }
            } else if (lineValue.includes("]")) {
              if (brackets[brackets.length - 1].char === "[") {
                brackets.pop();
              }
            }
          }

          const notMatchingOpeningBrackets = brackets
            .map((bracket: Bracket) => bracket.position)
            .sort((a: CodeMirrorWordPosition, b: CodeMirrorWordPosition) => {
              if (a.from.line > b.from.line) {
                return -1;
              } else {
                return 0;
              }
            });

          const getKeyAndValueFromLine = (
            editor: CodeMirror.Editor,
            line: number
          ): string[] => {
            return editor
              .getLine(line)
              .split(":")
              .map((item: string) => {
                return item.replace(/\"|\,/g, "").trim();
              });
          };

          let expPrefix = "";

          console.log(notMatchingOpeningBrackets);

          notMatchingOpeningBrackets.forEach(
            (
              item: CodeMirrorWordPosition,
              idx: number,
              arr: CodeMirrorWordPosition[]
            ) => {
              if (
                arr[idx + 1] &&
                editor.getRange(arr[idx + 1].from, arr[idx + 1].to) === "["
              ) {
                return;
              }
              if (editor.getRange(item.from, item.to) === "{") {
                let currentSearchLine = item.from.line;
                let currentLine = editor.getLine(currentSearchLine);
                while (!currentLine.match(/\"[A-Za-z]*\":/g)) {
                  currentLine = editor.getLine(--currentSearchLine);
                }
                if (
                  getKeyAndValueFromLine(editor, currentSearchLine)[1] === "["
                ) {
                  return;
                } else {
                  expPrefix =
                    getKeyAndValueFromLine(editor, currentSearchLine)[0] +
                    expPrefix +
                    ".";
                }
              } else if (editor.getRange(item.from, item.to) === "[") {
                let currentSearchLine = item.from.line;
                let currentLine = editor.getLine(currentSearchLine);
                while (!currentLine.match(/\"[A-Za-z]*\":/g)) {
                  currentLine = editor.getLine(--currentSearchLine);
                }
                const parentKey = getKeyAndValueFromLine(
                  editor,
                  currentSearchLine
                )[0];
                const propertyPath = expPrefix + newExp;
                console.log(propertyPath);
                const [closingBracketPos] = getPositions("]", item.from, {
                  line: editor.lastLine(),
                  ch: 999,
                });
                let occurrences = getPositions(
                  `"${propertyPath.split(".")[0]}":`,
                  item.from,
                  closingBracketPos.from
                );
                const nestingLevels = propertyPath.split(".");
                if (nestingLevels.length !== 1) {
                  nestingLevels.slice(1).forEach((level: string) => {
                    occurrences.filter((occ: CodeMirrorWordPosition) => {
                      return (
                        getPositions(
                          `"${level}":`,
                          occ.from,
                          getPositions("}", occ.from, {
                            line: editor.lastLine(),
                            ch: 999,
                          })[0].from
                        ).length !== 0
                      );
                    });
                    occurrences = occurrences.map(
                      (occ: CodeMirrorWordPosition) => {
                        return getPositions(
                          `"${level}":`,
                          occ.from,
                          getPositions("}", occ.from, {
                            line: editor.lastLine(),
                            ch: 999,
                          })[0].from
                        )[0];
                      }
                    );
                  });
                }
                const currentIdx = occurrences.findIndex(
                  (pos: CodeMirrorWordPosition) => {
                    return pos.from.line === changeObject.from.line;
                  }
                );
                expPrefix = `${parentKey}[${currentIdx}].${expPrefix}`;

                // const expPositions = getPositions(
                //   newExp,
                //   item.from,
                //   getPositions(
                //     "]",
                //     { line: 1, ch: 0 },
                //     { line: editor.lastLine(), ch: 0 }
                //   )[closingBrackets.length].from
                // );
                // expPrefix =
                //   parentKey +
                //   "[" +
                //   expPositions
                //     .findIndex((el: CodeMirrorWordPosition) => {
                //       return el.from.line === changeObject.from.line;
                //     })
                //     .toString() +
                //   "]." +
                //   expPrefix;
                // console.log(expPrefix);
              }
            }
          );
          console.log(expPrefix + newExp);

          // if (
          //   openingCurlyBraces.length > closingCurlyBraces.length &&
          //   openingBrackets.length > closingBrackets.length
          // ) {
          //   if (
          //     openingCurlyBraces[openingCurlyBraces.length - 1].from.line >
          //     openingBrackets[openingBrackets.length - 1].from.line
          //   ) {
          //     const parentKey = editor
          //       .getLine(
          //         openingBrackets[openingCurlyBraces.length - 1].from.line
          //       )
          //       .split(":")[0]
          //       .replace(/\"|\,/g, "")
          //       .trim();
          //   }
          // }

          // if (openingBrackets.length > closingBrackets.length) {
          //   const parentKey = editor
          //     .getLine(openingBrackets[openingBrackets.length - 1].from.line)
          //     .split(":")[0]
          //     .replace(/\"|\,/g, "")
          //     .trim();
          //
          //   const expPositions = getPositions(
          //     newExp,
          //     openingBrackets[openingBrackets.length - 1].from,
          //     getPositions(
          //       "]",
          //       { line: 1, ch: 0 },
          //       { line: editor.lastLine(), ch: 0 }
          //     )[closingBrackets.length].from
          //   );
          //   expPrefix =
          //     parentKey +
          //     "[" +
          //     expPositions
          //       .findIndex((el: CodeMirrorWordPosition) => {
          //         return el.from.line === changeObject.from.line;
          //       })
          //       .toString() +
          //     "].";
          // }

          // const expPrefix =
          //   openingBrackets.length > closingBrackets.length
          //     ? editor
          //         .getLine(
          //           openingBrackets[openingBrackets.length - 1].from.line
          //         )
          //         .split(":")[0]
          //         .replace(/\"|\,/g, "")
          //         .trim() + "."
          //     : "";

          // if (openingParenthesizesPositions.length > closingParenthesizesPositions.length) {
          //   op
          // }
          // while (cursor.from() && cursor.to()) {
          //   if (specificLine) {
          //     if (cursor.from().line === specificLine) {
          //       return {
          //         from: cursor.from(),
          //         to: cursor.to(),
          //       };
          //     } else {
          //       return;
          //     }
          //   } else {
          //     wordPositions.push({
          //       from: cursor.from(),
          //       to: cursor.to(),
          //     });
          //   }
          //   cursor.findNext();
          // }
          // if (wordPositions.length === 0) return undefined;
          // return wordPositions;

          // console.log(expPrefix + oldExp, oldVal);
          // console.log(newExp, newVal);

          addItemToHistory(
            {
              propertyPath: expPrefix + oldExp,
              value: oldVal,
            },
            {
              propertyPath: expPrefix + newExp,
              value: newVal,
            }
          );
          updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        }
        // console.log(editor.getCursor());
        // if (changeObject.origin === "redo" || changeObject.origin === "undo") {
        //   undo();
        //   redo();
        //
        //   // editor.setValue()
        // }
        // try {
        //   updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        // } catch {}
        // excessive props check
        checkExcessivePropInLine(
          editor,
          getExcessiveProps(editor.getValue()),
          editor.getCursor().line
        );
        getAllExpressions(editor).forEach((expression) => {
          // check formats
          const formatOnCurrentLinePos = getWordPositions(
            editor,
            expression.format,
            true,
            editor.getCursor().line,
            true
          ) as CodeMirrorWordPosition | undefined;
          if (
            formatOnCurrentLinePos &&
            expression.format !== MathInputFormat.STRUCTURE_STRING &&
            expression.format !== MathInputFormat.PLAIN_TEXT &&
            expression.format !== MathInputFormat.TEX
          ) {
            setErrorLineAndGutter(
              editor,
              formatOnCurrentLinePos,
              "invalid expression format",
              CMErrorType.WRONG_EXP_FORMAT
            );
          } else {
            // check expressions
            const expressionOnCurrentLine = getWordPositions(
              editor,
              expression.expression,
              true,
              editor.getCursor().line,
              true
            );
            const errorMsg: string | null = getErrorFromMathInput(
              expression.format as MathInputFormat,
              expression.expression
            );
            if (
              expressionOnCurrentLine &&
              !Array.isArray(expressionOnCurrentLine) &&
              errorMsg !== null
            ) {
              setErrorLineAndGutter(
                editor,
                expressionOnCurrentLine,
                errorMsg,
                CMErrorType.INVALID_EXP
              );
            }
          }
        });
        console.log("ERRORS:", errors);
        checkActiveErrors(editor);
        // removeNotActualGutters(errors);
      });
      setEditor(editor);
    }
  }, []);

  const actionButtons: ActionButtonProps[] = [
    {
      size: 2,
      action: (editor: CodeMirror.Editor, errors: CMError[]): void => {
        editor.execCommand("find");
        removeNotActualGutters(errors);
        const closeButton = document.querySelector(
          ".CodeMirror-find-and-replace-dialog--close"
        );
        closeButton?.addEventListener("click", () => {
          removeNotActualGutters(errors);
        });
      },
      mdiIconPath: mdiMagnify,
      tooltip: "Найти (ctrl + f / cmd + f)",
    },
    {
      size: 2,
      action: (editor: CodeMirror.Editor, errors: CMError[]): void => {
        editor.execCommand("replace");
        removeNotActualGutters(errors);
        const closeButton = document.querySelector(
          ".CodeMirror-find-and-replace-dialog--close"
        );
        closeButton?.addEventListener("click", () => {
          removeNotActualGutters(errors);
        });
      },
      mdiIconPath: mdiFindReplace,
      tooltip: "Найти и заменить (ctrl + shift + f / cmd + opt + f)",
    },
  ];

  return (
    <div className="code-mirror">
      <div className="code-mirror__action-buttons">
        {actionButtons.map((button: ActionButtonProps, i: number) => {
          return (
            <ActionButton
              key={i}
              {...button}
              action={() => button.action(editor, dynamicErrors)}
            />
          );
        })}
      </div>
      <div className="code-mirror__editor-entry-point" ref={entryPoint} />
      <button
        onClick={() => {
          if (editor) {
            console.log(editor.getOption("gutters"));
            // editor.setOption("gutters", []);
          }
        }}
      >
        clear errors
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector<
  RootState,
  {
    namespaceJSON: NamespaceConstructorInputs;
    rulePackJSON: RulePackConstructorInputs;
    taskSetJSON: TaskSetConstructorInputs;
    currentHistoryChange: ConstructorHistoryItem | undefined;
  }
>({
  namespaceJSON: selectNamespaceJSON,
  rulePackJSON: selectRulePackJSON,
  taskSetJSON: selectTaskSetJSON,
  currentHistoryChange: selectCurrentTaskSetHistoryChange,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateNamespaceJSON: (namespaceJSON: NamespaceConstructorInputs) => {
    return dispatch(updateNamespaceJSON(namespaceJSON));
  },
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) => {
    return dispatch(updateTaskSetJSON(taskSetJSON));
  },
  updateRulePackJSON: (rulePackJSON: RulePackConstructorInputs) => {
    return dispatch(updateRulePackJSON(rulePackJSON));
  },
  // version control
  addItemToHistory: (
    oldVal: ConstructorHistoryItem,
    newVal: ConstructorHistoryItem
  ) => dispatch(addItemToTaskSetHistory({ oldVal, newVal })),
  undo: () => dispatch(undoTaskSetHistory()),
  redo: () => dispatch(redoTaskSetHistory()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CodeMirrorEditor);
