// libs and hooks
// types
import React, { Dispatch, useEffect, useRef, useState } from "react";
import CodeMirror, { Position, TextMarker } from "codemirror";
import { v4 as uidv4 } from "uuid";
// redux
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
import { connect, ConnectedProps } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectIsNamespaceJSONValid,
  selectIsRulePackJSONValid,
  selectIsTaskSetJSONValid,
  selectNamespaceJSON,
  selectRulePackJSON,
  selectTaskSetJSON,
} from "../../redux/constructor-jsons/constructor-jsons.selectors";
import {
  setJSONValidity,
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
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
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
  addMultipleLinesChangeToHistory,
  addOneLineChangeToHistory,
  redoHistory,
  undoHistory,
} from "../../redux/constructor-history/constructor-history.actions";
import {
  ConstructorHistoryItem,
  ExpressionChange,
} from "../../redux/constructor-history/constructor-history.types";
import {
  selectCurrentNamespaceHistoryChange,
  selectCurrentRulePackHistoryChange,
  selectCurrentTaskSetHistoryChange,
} from "../../redux/constructor-history/constructor-history.selectors";
import { ExpressionInput } from "../../constructors/task-constructor/task-constructor.types";
// jsonlint config
const jsonlint = require("jsonlint-mod");
// @ts-ignore
window["jsonlint"] = jsonlint;

export interface CodeMirrorProps {
  constructorType: ConstructorJSONType;
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
  invalidValue: string;
  gutterId: string;
}

interface Bracket {
  char: "{" | "[" | "}" | "]";
  position: CodeMirrorWordPosition;
}

const CodeMirrorEditor = ({
  constructorType,
  rulePackJSON,
  namespaceJSON,
  taskSetJSON,
  updateNamespaceJSON,
  updateRulePackJSON,
  updateTaskSetJSON,
  currentNamespaceHistoryChange,
  currentRulePackHistoryChange,
  currentTaskSetHistoryChange,
  undo,
  redo,
  addOneLineChangeToHistory,
  addMultipleLinesChangeToHistory,
  isNamespaceJSONValid,
  isRulePackJSONValid,
  isTaskSetJSONValid,
  setJSONValidity,
}: CodeMirrorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);
  const [dynamicErrors, setDynamicErrors] = useState<CMError[]>([]);
  let errors: CMError[] = [];
  let currentErrors: CMError[] = [];

  const entryPoint: React.Ref<any> = useRef();

  const isCurrentJSONValid = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return isNamespaceJSONValid;
      case ConstructorJSONType.RULE_PACK:
        return isRulePackJSONValid;
      case ConstructorJSONType.TASK_SET:
        return isTaskSetJSONValid;
    }
  })();

  const currentReduxJSON = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return namespaceJSON;
      case ConstructorJSONType.RULE_PACK:
        return rulePackJSON;
      case ConstructorJSONType.TASK_SET:
        return taskSetJSON;
    }
  })();

  const initialReduxJSON = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return CONSTRUCTOR_JSONS_INITIAL_STATE.namespace;
      case ConstructorJSONType.RULE_PACK:
        return CONSTRUCTOR_JSONS_INITIAL_STATE.rulePack;
      case ConstructorJSONType.TASK_SET:
        return CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet;
    }
  })();

  const currentHistoryChange = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return currentNamespaceHistoryChange;
      case ConstructorJSONType.RULE_PACK:
        return currentRulePackHistoryChange;
      case ConstructorJSONType.TASK_SET:
        return currentTaskSetHistoryChange;
    }
  })();

  const updateCurrentReduxJSON = (() => {
    switch (constructorType) {
      case ConstructorJSONType.NAMESPACE:
        return updateNamespaceJSON;
      case ConstructorJSONType.RULE_PACK:
        return updateRulePackJSON;
      case ConstructorJSONType.TASK_SET:
        return updateTaskSetJSON;
    }
  })();

  const getKeyValuePairFromLine = (
    line: string
  ): {
    key: string;
    value: string;
  } => {
    if (!line.includes(":")) {
      return {
        key: "",
        value: "",
      };
    }
    let [key, value] = line.split(":").map((item: string) => item.trim());
    if (key.startsWith('"') || key.endsWith('"')) {
      key = key.split('"')[1];
    }
    if (value.endsWith(",")) {
      value = value.slice(0, -1);
    }
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.split('"')[1];
    } else {
      value = value.trim();
    }
    return {
      key,
      value,
    };
  };

  const getWordPositions = (
    editor: CodeMirror.Editor,
    word: string,
    findOne?: boolean,
    specificLine?: number,
    withParentheses: boolean = false
  ): CodeMirrorWordPosition[] => {
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
          return [
            {
              from: cursor.from(),
              to: cursor.to(),
            },
          ];
        } else {
          return [];
        }
      } else {
        wordPositions.push({
          from: cursor.from(),
          to: cursor.to(),
        });
      }
      cursor.findNext();
    }
    if (wordPositions.length === 0) return [];
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
    try {
      addExcessiveProps(JSON.parse(doc), initialReduxJSON);
    } catch {
      return [];
    }
    return excessiveProps;
  };

  const setErrorLineAndGutter = (
    editor: CodeMirror.Editor,
    wordPosition: CodeMirrorWordPosition,
    invalidValue: string,
    msg: string,
    errorType: CMErrorType
  ): void => {
    const { from, to } = wordPosition;
    const id = uidv4();
    editor.markText(from, to, {
      className: "CodeMirror-lint-mark-error",
      title: msg,
    });
    // @ts-ignore
    editor.getAllMarks()[editor.getAllMarks().length - 1].errorId = id;
    // @ts-ignore
    editor.getAllMarks()[editor.getAllMarks().length - 1].errorType = errorType;

    const marker: HTMLDivElement = document.createElement("div");
    marker.setAttribute("error-type", errorType);
    marker.setAttribute("class", "CodeMirror-lint-marker-error");
    marker.setAttribute("data-toggle", "tooltip");
    marker.setAttribute("data-placement", "right");
    marker.setAttribute("title", msg);
    marker.setAttribute("id", id);
    editor.setGutterMarker(from.line, "gutter-error", marker);

    currentErrors.push({
      invalidValue,
      gutterId: id,
      type: CMErrorType.WRONG_EXP_FORMAT,
    });
  };

  const destroyAllErrors = (editor: CodeMirror.Editor): void => {
    editor.clearGutter("gutter-error");
    editor.getAllMarks().forEach((mark: TextMarker) => {
      mark.clear();
    });
  };

  // TODO: refactor function, remove inner function, make it clean
  // const getAllExpressions = (
  //   editor: CodeMirror.Editor
  // ): { format: string; expression: string }[] => {
  //   try {
  //     JSON.parse(editor.getValue());
  //   } catch {
  //     return [];
  //   }
  //   const editorObj = JSON.parse(editor.getValue());
  //   const expressions: { format: string; expression: string }[] = [];
  //   const appendExpressions = (obj: any) => {
  //     if (typeof obj === "object") {
  //       if (obj.hasOwnProperty("format") && obj.hasOwnProperty("expression")) {
  //         expressions.push({
  //           format: obj.format,
  //           expression: obj.expression,
  //         });
  //       } else {
  //         Object.keys(obj).forEach((prop: string) => {
  //           if (typeof obj[prop] === "object") {
  //             if (
  //               obj[prop].hasOwnProperty("format") &&
  //               obj[prop].hasOwnProperty("expression")
  //             ) {
  //               expressions.push({
  //                 format: obj[prop].format,
  //                 expression: obj[prop].expression,
  //               });
  //             } else {
  //               appendExpressions(obj[prop]);
  //             }
  //           }
  //         });
  //       }
  //     }
  //   };
  //   appendExpressions(editorObj);
  //   return expressions;
  // };

  // const destroyError = (error: CMError, editor: CodeMirror.Editor) => {
  //   const marker = document.getElementById(error.gutterId);
  //   marker?.parentNode?.removeChild(marker);
  //   editor.getAllMarks().forEach((mark: TextMarker) => {
  //     if (
  //       // @ts-ignore
  //       mark.lines[0].lineNo() === error.position.from.line &&
  //       // @ts-ignore
  //       mark.lines[0].markedSpans[0].from === error.position.from.ch
  //     ) {
  //       mark.clear();
  //     }
  //   });
  //   errors = errors.filter((prevStateError: CMError) => {
  //     return (
  //       prevStateError.position.from.line !== error.position.from.line &&
  //       prevStateError.position.from.ch !== error.position.from.ch &&
  //       prevStateError.position.to.line !== error.position.to.line &&
  //       prevStateError.position.to.ch !== error.position.to.ch
  //     );
  //   });
  //   setDynamicErrors(errors);
  // };

  // const checkActiveErrors = (editor: CodeMirror.Editor) => {
  //   // active errors checking
  //   if (errors.length !== 0) {
  //     const excessiveProps = getExcessiveProps(editor.getValue());
  //     const expressions = getAllExpressions(editor);
  //     errors.forEach((error: CMError) => {
  //       if (error.type === CMErrorType.EXCESSIVE_PROP) {
  //         if (
  //           excessiveProps.every((excessiveProp: string) => {
  //             const excessivePropOnCurrentLine = getWordPositions(
  //               editor,
  //               excessiveProp,
  //               true,
  //               error.position.from.line,
  //               true
  //             );
  //             console.log(error, excessivePropOnCurrentLine);
  //             return !excessivePropOnCurrentLine;
  //           })
  //         ) {
  //           console.log("Error destroyed");
  //           destroyError(error, editor);
  //         } else {
  //           console.log("ERROR FOUND");
  //         }
  //       } else if (error.type === CMErrorType.WRONG_EXP_FORMAT) {
  //         if (
  //           expressions.every((expression) => {
  //             const formatOnCurrentLine = getWordPositions(
  //               editor,
  //               expression.format,
  //               true,
  //               error.position.from.line,
  //               true
  //             );
  //             return (
  //               formatOnCurrentLine === undefined ||
  //               expression.format === MathInputFormat.PLAIN_TEXT ||
  //               expression.format === MathInputFormat.STRUCTURE_STRING ||
  //               expression.format === MathInputFormat.TEX
  //             );
  //           })
  //         ) {
  //           destroyError(error, editor);
  //         }
  //       } else if (error.type === CMErrorType.INVALID_EXP) {
  //         if (
  //           expressions.every((expression) => {
  //             const expressionOnCurrentLine = getWordPositions(
  //               editor,
  //               expression.expression,
  //               true,
  //               error.position.from.line,
  //               true
  //             );
  //             if (expressionOnCurrentLine === undefined) {
  //               return true;
  //             } else {
  //               return (
  //                 (expression.format === MathInputFormat.PLAIN_TEXT ||
  //                   expression.format === MathInputFormat.STRUCTURE_STRING ||
  //                   expression.format === MathInputFormat.TEX) &&
  //                 getErrorFromMathInput(
  //                   expression.format as MathInputFormat,
  //                   expression.expression
  //                 ) === null
  //               );
  //             }
  //           })
  //         ) {
  //           destroyError(error, editor);
  //         }
  //       }
  //     });
  //   }
  // };

  const removeNotActualGutters = (errors: CMError[]): void => {
    Array.from(
      document.querySelectorAll("div .CodeMirror-lint-marker-error")
    ).forEach((element: Element) => {
      if (
        !errors.some((error: CMError) => {
          return error.gutterId === element.id;
        })
      ) {
        element?.parentNode?.removeChild(element);
      }
    });
  };

  const removeAllGutters = () => {
    Array.from(
      document.querySelectorAll("div .CodeMirror-lint-marker-error")
    ).forEach((element: Element) => {
      element?.parentNode?.removeChild(element);
    });
  };

  // const checkExcessivePropInLine = (
  //   editor: CodeMirror.Editor,
  //   excessiveProps: string[],
  //   line: number
  // ) => {
  //   excessiveProps.forEach((excessiveProp: string) => {
  //     const excessivePropOnCurrentLinePos = getWordPositions(
  //       editor,
  //       excessiveProp,
  //       true,
  //       line,
  //       true
  //     );
  //     if (
  //       excessivePropOnCurrentLinePos &&
  //       !Array.isArray(excessivePropOnCurrentLinePos)
  //     ) {
  //       setErrorLineAndGutter(
  //         editor,
  //         excessivePropOnCurrentLinePos,
  //         "unexpected property",
  //         CMErrorType.EXCESSIVE_PROP
  //       );
  //     }
  //   });
  // };

  const getPositions = (
    editor: CodeMirror.Editor,
    query: string,
    start: Position,
    end: Position
  ): CodeMirrorWordPosition[] => {
    const res: CodeMirrorWordPosition[] = [];
    // @ts-ignore
    const cursor = editor.getSearchCursor(query, start);
    cursor.find();
    while (cursor.from() && cursor.to() && cursor.from().line <= end.line) {
      res.push({
        from: cursor.from(),
        to: cursor.to(),
      });
      cursor.findNext();
    }
    return res;
  };

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

  useEffect(() => {
    if (editor && currentHistoryChange && undoOrRedoIsTriggered) {
      try {
        if (currentHistoryChange.type === "ONE_LINE_CHANGE") {
          const cursorPos = editor.getCursor();
          const setToValue = (obj: any, value: any, path: any) => {
            console.log(path);
            console.log(value);
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
            currentHistoryChange.item.value,
            currentHistoryChange.item.propertyPath
              .replace("[", ".")
              .replace("]", "")
          );
          console.log(newEditorVal);
          editor.setValue(JSON.stringify(newEditorVal, null, 2));
          editor.setCursor(cursorPos);
        } else if (currentHistoryChange.type === "MULTIPLE_LINES_CHANGE") {
          editor.setValue(JSON.stringify(currentHistoryChange.item, null, 2));
          // @ts-ignore
          updateCurrentReduxJSON(currentHistoryChange.item);
        }
      } catch (e) {
        console.log("ERROR WHILE UNDO/REDO", e.message);
        return;
      }
    }
  }, [currentHistoryChange]);

  const [undoOrRedoIsTriggered, setUndoOrRedoIsTriggered] = useState(false);

  const getAllExpressions = (editor: CodeMirror.Editor): ExpressionInput[] => {
    try {
      const editorValue = JSON.parse(editor.getValue());
      const expressions: ExpressionInput[] = [];
      const findAndAddExpressionsInObj = (obj: any) => {
        for (const key in obj) {
          if (
            obj[key].hasOwnProperty("format") &&
            obj[key].hasOwnProperty("expression")
          ) {
            expressions.push({ ...obj[key] });
          } else if (Array.isArray(obj[key])) {
            findAndAddExpressionsInObj(Object.assign({}, obj[key]));
          } else if (typeof obj[key] === "object") {
            findAndAddExpressionsInObj(obj[key]);
          }
        }
      };
      findAndAddExpressionsInObj(editorValue);
      return expressions;
    } catch (e) {
      return [];
    }
  };

  const getAllGutters = (): Element[] => {
    return Array.from(
      document.querySelectorAll("div .CodeMirror-lint-marker-error")
    );
  };

  const removeAllErrorsOfType = (
    editor: CodeMirror.Editor,
    errorType: CMErrorType | "all"
  ) => {
    getAllGutters().forEach((element: Element) => {
      if (
        element.getAttribute("error-type") === errorType ||
        errorType === "all"
      ) {
        element?.parentNode?.removeChild(element);
      }
    });
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      if (errorType === mark.errorType || errorType === "all") {
        mark.clear();
      }
    });
  };

  const checkAllExpressionsInputExpressions = (
    editor: CodeMirror.Editor,
    expressions: ExpressionInput[]
  ) => {
    removeAllErrorsOfType(editor, CMErrorType.INVALID_EXP);
    const positions = getWordPositions(editor, '"expression"');
  };

  const isExpressionFormatValid = (
    format: string | MathInputFormat
  ): boolean => {
    return (
      format === MathInputFormat.STRUCTURE_STRING ||
      format === MathInputFormat.PLAIN_TEXT ||
      format === MathInputFormat.TEX
    );
  };
  //
  // const checkAllExpressions = (
  //   editor: CodeMirror.Editor,
  //   expressions: ExpressionInput[]
  // ) => {
  //   removeAllErrorsOfType(editor, CMErrorType.INVALID_EXP);
  //   const expPositions = getWordPositions(editor, '"expression"');
  //   expressions.forEach((expression: ExpressionInput, idx: number) => {
  //     if (
  //       isExpressionFormatValid(expression.format) &&
  //       expression.expression !== ""
  //     ) {
  //       if (
  //         getErrorFromMathInput(expression.format, expression.expression) !==
  //         null
  //       ) {
  //         const expPosition = expPositions[idx];
  //         const [errUnderlinePosition] = getWordPositions(
  //           editor,
  //           expression.expression,
  //           true,
  //           expPosition.from.line
  //         );
  //         setErrorLineAndGutter(
  //           editor,
  //           errUnderlinePosition,
  //           "invalid expression",
  //           CMErrorType.INVALID_EXP
  //         );
  //         // currentErrors.push({
  //         //   gutterId: uidv4(),
  //         //   position: errUnderlinePosition,
  //         //   type: CMErrorType.INVALID_EXP,
  //         // });
  //       }
  //     }
  //   });
  // };

  // const checkAllExpressionsInputFormats = (
  //   editor: CodeMirror.Editor,
  //   expressions: ExpressionInput[]
  // ) => {
  //   removeAllErrorsOfType(editor, "all");
  //   const formatPositions = getWordPositions(editor, '"format"');
  //   expressions.forEach((expression: ExpressionInput, idx: number) => {
  //     if (!isExpressionFormatValid(expression.format)) {
  //       const formatPosition = formatPositions[idx];
  //       const [errUnderlinePosition] = getWordPositions(
  //         editor,
  //         expression.format,
  //         true,
  //         formatPosition.from.line
  //       );
  //       setErrorLineAndGutter(
  //         editor,
  //         errUnderlinePosition,
  //         "wrong format",
  //         CMErrorType.WRONG_EXP_FORMAT
  //       );
  //       // currentErrors.push({
  //       //   gutterId: uidv4(),
  //       //   position: errUnderlinePosition,
  //       //   type: CMErrorType.WRONG_EXP_FORMAT,
  //       // });
  //     }
  //   });
  // };

  const removeErrorById = (editor: CodeMirror.Editor, id: string) => {
    currentErrors = currentErrors.filter((error) => {
      return error.gutterId === id;
    });
    getAllGutters().forEach((element: Element) => {
      if (element.getAttribute("id") === id) {
        element?.parentNode?.removeChild(element);
      }
    });
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      if (mark.errorId === id) {
        mark.clear();
      }
    });
  };

  const checkFormatInLine = (
    editor: CodeMirror.Editor,
    lineValue: string,
    lineNumber: number
  ): void => {
    if (!lineValue.includes('"format"')) {
      return;
    }
    const { value: format } = getKeyValuePairFromLine(lineValue);
    // remove duplicate error
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      if (mark.lines[0].lineNo() === lineNumber) {
        // @ts-ignore
        removeErrorById(editor, mark.errorId);
      }
    });
    if (!isExpressionFormatValid(format)) {
      setErrorLineAndGutter(
        editor,
        getWordPositions(editor, format, true, lineNumber)[0],
        format,
        "invalid format",
        CMErrorType.WRONG_EXP_FORMAT
      );
    }
  };

  const checkExpressionInLine = (
    editor: CodeMirror.Editor,
    lineValue: string,
    lineNumber: number
  ): void => {
    if (!lineValue.includes('"expression"')) {
      return;
    }
    let format: string | null = null;
    let searchLine = lineNumber;
    while (
      !editor.getLine(searchLine).includes('"format"') &&
      !editor.getLine(searchLine).includes("{")
    ) {
      searchLine--;
    }
    if (!editor.getLine(searchLine).includes('"format"')) {
      searchLine = lineNumber;
      while (
        !editor.getLine(searchLine).includes('"format"') &&
        !editor.getLine(searchLine).includes("}")
      ) {
        searchLine++;
      }
    }
    if (editor.getLine(searchLine).includes('"format"')) {
      const { value } = getKeyValuePairFromLine(editor.getLine(searchLine));
      format = value;
    }
    if (format === null || !isExpressionFormatValid(format)) {
      return;
    }
    const { value: expression } = getKeyValuePairFromLine(lineValue);
    // remove duplicate error
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      if (mark.lines[0].lineNo() === lineNumber) {
        // @ts-ignore
        removeErrorById(editor, mark.errorId);
      }
    });
    if (getErrorFromMathInput(format as MathInputFormat, expression) !== null) {
      setErrorLineAndGutter(
        editor,
        getWordPositions(editor, expression, true, lineNumber)[0],
        expression,
        "invalid expression",
        CMErrorType.INVALID_EXP
      );
    }
  };

  useEffect(() => {
    const initialValue = currentReduxJSON;
    if (constructorType === ConstructorJSONType.RULE_PACK) {
      //@ts-ignore
      if (
        //@ts-ignore
        initialValue.rulePacks &&
        //@ts-ignore
        typeof initialValue.rulePacks === "string" &&
        //@ts-ignore
        initialValue.rulePacks.includes(",")
      ) {
        // @ts-ignore
        initialValue.rulePacks = initialValue.rulePacks.split(",");
      }
    }

    if (entryPoint.current) {
      // setup editor
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
      // setup undo redo logic
      editor.undo = () => {
        setUndoOrRedoIsTriggered(true);
        undo(constructorType);
        setUndoOrRedoIsTriggered(false);
        try {
          updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        } catch (e) {}
      };
      editor.redo = () => {
        setUndoOrRedoIsTriggered(true);
        redo(constructorType);
        setUndoOrRedoIsTriggered(false);
        try {
          updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        } catch (e) {}
      };
      let lastValidValue: any = JSON.parse(editor.getValue());
      let isJSONValid: boolean = true;
      // setup editor's onchange actions
      editor.on("change", (editor, changeObject) => {
        // checkAllExpressionsInputFormats(editor, getAllExpressions(editor));
        // console.log(changeObject);
        if (editor.getLine(changeObject.from.line).includes('"format"')) {
          checkFormatInLine(
            editor,
            editor.getLine(changeObject.from.line),
            changeObject.from.line
          );
        }
        if (editor.getLine(changeObject.from.line).includes('"expression"')) {
          checkExpressionInLine(
            editor,
            editor.getLine(changeObject.from.line),
            changeObject.from.line
          );
        }
        try {
          JSON.parse(editor.getValue());
          setJSONValidity(constructorType, true);
          if (!isJSONValid) {
            addMultipleLinesChangeToHistory(
              lastValidValue,
              JSON.parse(editor.getValue()),
              constructorType
            );
            lastValidValue = JSON.parse(editor.getValue());
            isJSONValid = true;
            updateTaskSetJSON(JSON.parse(editor.getValue()));
            return;
          }
          lastValidValue = JSON.parse(editor.getValue());
          isJSONValid = true;
        } catch {
          setJSONValidity(constructorType, false);
          isJSONValid = false;
          return;
        }
        // const numberOfChangedLines: number | undefined =
        //   changeObject.text.length !== 0
        //     ? changeObject.removed?.length
        //     : changeObject.text.length;
        const changedLineNum: number = changeObject.from.line;
        // one line change
        if (
          ((changeObject.origin === "+input" ||
            changeObject.origin === "paste") &&
            changeObject.text.length === 1) ||
          ((changeObject.origin === "+delete" ||
            changeObject.origin === "cut") &&
            changeObject.removed?.length === 1)
        ) {
          const { key: newKey, value: newVal } = getKeyValuePairFromLine(
            editor.getLine(changedLineNum)
          );
          const { key: oldKey, value: oldVal } = (() => {
            const changedLineText: string = editor.getLine(changedLineNum);
            if (
              changeObject.origin === "+input" ||
              changeObject.origin === "paste"
            ) {
              return getKeyValuePairFromLine(
                changedLineText.slice(0, changeObject.from.ch) +
                  changedLineText.slice(
                    changeObject.from.ch + changeObject.text[0].length
                  )
              );
            } else {
              return getKeyValuePairFromLine(
                changedLineText.slice(0, changeObject.from.ch) +
                  // @ts-ignore
                  changeObject.removed[0] +
                  changedLineText.slice(changeObject.from.ch)
              );
            }
          })();

          console.log("New vals: ", newVal, newKey);
          console.log("Old vals: ", oldVal, oldKey);

          let expPrefix = "";

          const brackets: Bracket[] = [];
          let searchLine = 1;
          while (searchLine < changeObject.from.line) {
            const lineValue = editor.getLine(searchLine);
            if (
              !(lineValue.includes("[") && lineValue.includes("]")) &&
              !(lineValue.includes("{") && lineValue.includes("}"))
            ) {
              if (lineValue.includes("{")) {
                brackets.push({
                  char: "{",
                  position: getPositions(
                    editor,
                    "{",
                    { line: searchLine, ch: 0 },
                    { line: searchLine, ch: 999 }
                  )[0],
                });
              } else if (lineValue.includes("[")) {
                brackets.push({
                  char: "[",
                  position: getPositions(
                    editor,
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
            searchLine++;
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
                const propertyPath = expPrefix + newKey;
                const [closingBracketPos] = getPositions(
                  editor,
                  "]",
                  item.from,
                  {
                    line: editor.lastLine(),
                    ch: 999,
                  }
                );
                console.log(propertyPath.split(".")[0]);
                let occurrences = getPositions(
                  editor,
                  `"${propertyPath.split(".")[0]}":`,
                  item.from,
                  closingBracketPos.from
                );
                console.log(occurrences);
                const nestingLevels = propertyPath.split(".");
                if (nestingLevels.length !== 1) {
                  nestingLevels.slice(1).forEach((level: string) => {
                    occurrences.filter((occ: CodeMirrorWordPosition) => {
                      return (
                        getPositions(
                          editor,
                          `"${level}":`,
                          occ.from,
                          getPositions(editor, "}", occ.from, {
                            line: editor.lastLine(),
                            ch: 999,
                          })[0].from
                        ).length !== 0
                      );
                    });
                    occurrences = occurrences.map(
                      (occ: CodeMirrorWordPosition) => {
                        return getPositions(
                          editor,
                          `"${level}":`,
                          occ.from,
                          getPositions(editor, "}", occ.from, {
                            line: editor.lastLine(),
                            ch: 999,
                          })[0].from
                        )[0];
                      }
                    );
                  });
                }
                console.log(occurrences);
                const currentIdx = occurrences.findIndex(
                  (pos: CodeMirrorWordPosition) => {
                    return pos.from.line === changeObject.from.line;
                  }
                );
                console.log(currentIdx);
                expPrefix = `${parentKey}[${currentIdx}].${expPrefix}`;
              }
            }
          );

          addOneLineChangeToHistory(
            {
              propertyPath: expPrefix + oldKey,
              value: oldVal,
            },
            {
              propertyPath: expPrefix + newKey,
              value: newVal,
            },
            constructorType
          );
          try {
            updateCurrentReduxJSON(JSON.parse(editor.getValue()));
          } catch {}
        } else if (
          (changeObject.origin === "cut" ||
            changeObject.origin === "+delete") &&
          changeObject.removed &&
          changeObject.removed.length > 1
        ) {
          const oldVal =
            editor.getRange(
              {
                line: 0,
                ch: 0,
              },
              changeObject.from
            ) +
            changeObject.removed.join("") +
            editor.getRange(changeObject.from, {
              line: editor.lastLine(),
              ch: 999,
            });
          addMultipleLinesChangeToHistory(
            JSON.parse(oldVal),
            JSON.parse(editor.getValue()),
            constructorType
          );
          try {
            updateCurrentReduxJSON(JSON.parse(editor.getValue()));
          } catch {}
        } else if (
          changeObject.origin === "paste" &&
          changeObject.text.length > 1
        ) {
          // const pastedPiece = changeObject.text.reduce(
          //   (acc: string, line: string, i: number) => {
          //     return acc + "\n" + line;
          //   }
          // );
          const removedPiece = changeObject.removed
            ? changeObject.removed.reduce(
                (acc: string, line: string, i: number) => {
                  return acc + "\n" + line;
                }
              )
            : null;
          let oldVal =
            editor.getRange({ line: 0, ch: 0 }, changeObject.from) +
            (removedPiece ? removedPiece : "") +
            editor.getRange(
              {
                line: changeObject.to.line + changeObject.text.length,
                ch: 0,
              },
              {
                line: editor.lastLine(),
                ch: 999,
              }
            );
          try {
            JSON.parse(oldVal);
          } catch (e) {
            // error usually occurs when user pastes new element into the end of array
            // if (e.message.includes("Unexpected token , in JSON at position ")) {
            //   const commaPosition: number = parseInt(
            //     e.message.replace("Unexpected token , in JSON at position ", "")
            //   );
            //   oldVal =
            //     oldVal.slice(0, commaPosition) +
            //     oldVal.slice(commaPosition + 1);
            // }
          }
          console.log(oldVal);
          addMultipleLinesChangeToHistory(
            JSON.parse(oldVal),
            JSON.parse(editor.getValue()),
            constructorType
          );
          try {
            updateCurrentReduxJSON(JSON.parse(editor.getValue()));
          } catch {}
        }
        // console.log(editor.getCursor());
        // if (changeObject.origin === "redo" || changeObject.origin === "undo") {
        //   undo();
        //   redo();
        //
        //   // editor.setValue()
        // }

        // excessive props check
        // checkExcessivePropInLine(
        //   editor,
        //   getExcessiveProps(editor.getValue()),
        //   editor.getCursor().line
        // );
        // // console.log(allExpressions);
        // // check format on current line
        // const line = editor.getLine(editor.getCursor().line);
        // if (line.includes('"format":')) {
        //   const [_, formatOnCurrentLine] = editor
        //     .getLine(changeObject.from.line)
        //     .split(":")
        //     .map((item: string) => {
        //       item = item.trim();
        //       if (item.endsWith('",')) {
        //         item = item.slice(0, -1);
        //       }
        //       return item.replace(/\"/g, "");
        //     });
        //   if (
        //     formatOnCurrentLine &&
        //     formatOnCurrentLine !== MathInputFormat.STRUCTURE_STRING &&
        //     formatOnCurrentLine !== MathInputFormat.PLAIN_TEXT &&
        //     formatOnCurrentLine !== MathInputFormat.TEX
        //   ) {
        //     const wordPosition = getWordPositions(
        //       editor,
        //       formatOnCurrentLine,
        //       true,
        //       editor.getCursor().line,
        //       true
        //     ) as CodeMirrorWordPosition | undefined;
        //     if (wordPosition) {
        //       setErrorLineAndGutter(
        //         editor,
        //         wordPosition,
        //         "invalid expression format",
        //         CMErrorType.WRONG_EXP_FORMAT
        //       );
        //     }
        //   }
        // }
        // if (line.includes('"expression":')) {
        //   const [_, expressionOnCurrentLine] = editor
        //     .getLine(changeObject.from.line)
        //     .split(":")
        //     .map((item: string) => {
        //       item = item.trim();
        //       if (item.endsWith('",')) {
        //         item = item.slice(0, -1);
        //       }
        //       return item.replace(/\"/g, "");
        //     });
        //   let format: string = "";
        //   let searchLine = changeObject.from.line;
        //   while (!editor.getLine(searchLine).includes("{")) {
        //     if (editor.getLine(searchLine).includes('"format":')) {
        //       format = editor
        //         .getLine(searchLine)
        //         .split(":")
        //         .map((item: string) => {
        //           item = item.trim();
        //           if (item.endsWith('",')) {
        //             item = item.slice(0, -1);
        //           }
        //           return item.replace(/\"/g, "");
        //         })[1];
        //       break;
        //     } else {
        //       searchLine--;
        //     }
        //   }
        //   if (!format) {
        //     searchLine = changeObject.from.line;
        //     while (!editor.getLine(searchLine).includes("}")) {
        //       if (editor.getLine(searchLine).includes('"format":')) {
        //         format = editor
        //           .getLine(searchLine)
        //           .split(":")
        //           .map((item: string) => {
        //             item = item.trim();
        //             if (item.endsWith('",')) {
        //               item = item.slice(0, -1);
        //             }
        //             return item.replace(/\"/g, "");
        //           })[1];
        //         break;
        //       } else {
        //         searchLine++;
        //       }
        //     }
        //   }
        //   if (
        //     format === MathInputFormat.STRUCTURE_STRING ||
        //     format === MathInputFormat.PLAIN_TEXT ||
        //     format === MathInputFormat.TEX
        //   ) {
        //     const errorMsg: string | null = getErrorFromMathInput(
        //       format as MathInputFormat,
        //       expressionOnCurrentLine
        //     );
        //     if (
        //       expressionOnCurrentLine &&
        //       !Array.isArray(expressionOnCurrentLine) &&
        //       errorMsg !== null
        //     ) {
        //       setErrorLineAndGutter(
        //         editor,
        //         {
        //           from: {
        //             line: changeObject.from.line,
        //             ch: editor
        //               .getLine(changeObject.from.line)
        //               .indexOf(expressionOnCurrentLine[0]),
        //           },
        //           to: {
        //             line: changeObject.from.line,
        //             ch: editor
        //               .getLine(changeObject.from.line)
        //               .indexOf(
        //                 expressionOnCurrentLine[
        //                   expressionOnCurrentLine.length - 1
        //                 ]
        //               ),
        //           },
        //         },
        //         errorMsg,
        //         CMErrorType.INVALID_EXP
        //       );
        //     }
        //   }
        // }
        // check expression on current line
        // allExpressions.forEach((expression) => {
        //   // check formats
        //   const formatOnCurrentLinePos = getWordPositions(
        //     editor,
        //     expression.format,
        //     true,
        //     editor.getCursor().line,
        //     true
        //   ) as CodeMirrorWordPosition | undefined;
        //   if (
        //     formatOnCurrentLinePos &&
        //     expression.format !== MathInputFormat.STRUCTURE_STRING &&
        //     expression.format !== MathInputFormat.PLAIN_TEXT &&
        //     expression.format !== MathInputFormat.TEX
        //   ) {
        //     setErrorLineAndGutter(
        //       editor,
        //       formatOnCurrentLinePos,
        //       "invalid expression format",
        //       CMErrorType.WRONG_EXP_FORMAT
        //     );
        //   } else {
        //     // check expressions
        //     const expressionOnCurrentLine = getWordPositions(
        //       editor,
        //       expression.expression,
        //       true,
        //       editor.getCursor().line,
        //       true
        //     );
        //     const errorMsg: string | null = getErrorFromMathInput(
        //       expression.format as MathInputFormat,
        //       expression.expression
        //     );
        //     if (
        //       expressionOnCurrentLine &&
        //       !Array.isArray(expressionOnCurrentLine) &&
        //       errorMsg !== null
        //     ) {
        //       setErrorLineAndGutter(
        //         editor,
        //         expressionOnCurrentLine,
        //         errorMsg,
        //         CMErrorType.INVALID_EXP
        //       );
        //     }
        //   }
        // });
        // checkActiveErrors(editor);
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
    currentTaskSetHistoryChange: ConstructorHistoryItem | undefined;
    currentNamespaceHistoryChange: ConstructorHistoryItem | undefined;
    currentRulePackHistoryChange: ConstructorHistoryItem | undefined;
    isNamespaceJSONValid: boolean;
    isTaskSetJSONValid: boolean;
    isRulePackJSONValid: boolean;
  }
>({
  namespaceJSON: selectNamespaceJSON,
  rulePackJSON: selectRulePackJSON,
  taskSetJSON: selectTaskSetJSON,
  currentTaskSetHistoryChange: selectCurrentTaskSetHistoryChange,
  currentNamespaceHistoryChange: selectCurrentNamespaceHistoryChange,
  currentRulePackHistoryChange: selectCurrentRulePackHistoryChange,
  isNamespaceJSONValid: selectIsNamespaceJSONValid,
  isTaskSetJSONValid: selectIsTaskSetJSONValid,
  isRulePackJSONValid: selectIsRulePackJSONValid,
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
  addOneLineChangeToHistory: (
    oldVal: ExpressionChange,
    newVal: ExpressionChange,
    constructorType: ConstructorJSONType
  ) => dispatch(addOneLineChangeToHistory({ oldVal, newVal, constructorType })),
  addMultipleLinesChangeToHistory: (
    oldVal: TaskSetConstructorInputs,
    newVal: TaskSetConstructorInputs,
    constructorType: ConstructorJSONType
  ) => {
    dispatch(
      addMultipleLinesChangeToHistory({ oldVal, newVal, constructorType })
    );
  },
  undo: (constructorType: ConstructorJSONType) =>
    dispatch(undoHistory(constructorType)),
  redo: (constructorType: ConstructorJSONType) =>
    dispatch(redoHistory(constructorType)),
  setJSONValidity: (constructorType: ConstructorJSONType, isValid: boolean) =>
    dispatch(setJSONValidity(constructorType, isValid)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CodeMirrorEditor);
