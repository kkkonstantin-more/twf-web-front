// libs and hooks
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { v4 as uidv4 } from "uuid";
// custom components
import ActionButton from "../action-button/action-button.component";
// utils
import {
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
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
// types
import CodeMirror, { Position, TextMarker } from "codemirror";
import { ActionButtonProps } from "../action-button/action-button.types";
import { ExpressionInput } from "../../constructors/task-constructor/task-constructor.types";
import { ConstructorJSONType } from "../../redux/constructor-jsons/constructor-jsons.types";
import { NamespaceConstructorInputs } from "../../constructors/namespace-constructor/namespace-constructor.types";
import { RootState } from "../../redux/root-reducer";
import { RulePackConstructorInputs } from "../../constructors/rule-pack-constructor/rule-pack-constructor.types";
import { TaskSetConstructorInputs } from "../../constructors/task-set-constructor/task-set-constructor.types";
import {
  Bracket,
  CMError,
  CMErrorType,
  CodeMirrorProps,
  CodeMirrorWordPosition,
} from "./code-mirror.types";
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
// assets
import { mdiContentCopy, mdiFindReplace, mdiMagnify } from "@mdi/js";
// styles
import "./code-mirror.styles.scss";
import TaskSetConstructorFormatter from "../../constructors/task-set-constructor/task-set-constructor.formatter";
import copyToClipboard from "../../utils/copy-to-clipboard/copy-to-clipboard";
import RulePackConstructorFormatter from "../../constructors/rule-pack-constructor/rule-pack-constructor.formatter";

// setup json linter
const jsonlint = require("jsonlint-mod");
// @ts-ignore
window["jsonlint"] = jsonlint;

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
  setJSONValidity,
}: CodeMirrorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);
  const entryPoint: React.Ref<any> = useRef();
  let currentErrors: CMError[] = [];

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

  const setErrorLineAndGutter = (
    editor: CodeMirror.Editor,
    wordPosition: CodeMirrorWordPosition,
    invalidValue: string,
    msg: string,
    errorType: CMErrorType
  ): void => {
    if (!wordPosition) {
      return;
    }
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
      type: errorType,
    });
  };

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

  const getAllExpressions = (editor: CodeMirror.Editor): ExpressionInput[] => {
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

  const isOneLineChange = (changeObject: CodeMirror.EditorChange): boolean => {
    return (
      ((changeObject.origin === "+input" || changeObject.origin === "paste") &&
        changeObject.text.length === 1) ||
      ((changeObject.origin === "+delete" || changeObject.origin === "cut") &&
        changeObject.removed?.length === 1)
    );
  };

  const isMultipleLineDelete = (
    changeObject: CodeMirror.EditorChange
  ): boolean => {
    return !!(
      (changeObject.origin === "cut" || changeObject.origin === "+delete") &&
      changeObject.removed &&
      changeObject.removed.length > 1
    );
  };

  const isMultipleLineAdd = (
    changeObject: CodeMirror.EditorChange
  ): boolean => {
    return changeObject.origin === "paste" && changeObject.text.length > 1;
  };

  const isBracketInsideCommas = (
    bracketChar: "{" | "}" | "[" | "]",
    lineValue: string
  ) => {
    const bracketPosition = lineValue.indexOf(bracketChar);
    const commaPosition = lineValue.lastIndexOf('"');
    return commaPosition > bracketPosition;
  };

  const getNotMatchingOpeningBracketsBeforeLine = (
    editor: CodeMirror.Editor,
    lineNum: number
  ): Bracket[] => {
    const brackets: Bracket[] = [];
    let searchLine = 1;
    while (searchLine < lineNum) {
      const lineValue = editor.getLine(searchLine);
      if (
        !(
          lineValue.includes("[") &&
          !isBracketInsideCommas("[", lineValue) &&
          lineValue.includes("]") &&
          !isBracketInsideCommas("]", lineValue)
        ) &&
        !(lineValue.includes("{") && lineValue.includes("}"))
      ) {
        if (lineValue.includes("{") && !isBracketInsideCommas("{", lineValue)) {
          brackets.push({
            char: "{",
            position: getPositions(
              editor,
              "{",
              { line: searchLine, ch: 0 },
              { line: searchLine, ch: 999 }
            )[0],
          });
        } else if (
          lineValue.includes("[") &&
          !isBracketInsideCommas("[", lineValue)
        ) {
          brackets.push({
            char: "[",
            position: getPositions(
              editor,
              "[",
              { line: searchLine, ch: 0 },
              { line: searchLine, ch: 999 }
            )[0],
          });
        } else if (
          lineValue.includes("}") &&
          !isBracketInsideCommas("}", lineValue)
        ) {
          if (brackets[brackets.length - 1].char === "{") {
            brackets.pop();
          }
        } else if (
          lineValue.includes("]") &&
          !isBracketInsideCommas("]", lineValue)
        ) {
          if (brackets[brackets.length - 1].char === "[") {
            brackets.pop();
          }
        }
      }
      searchLine++;
    }
    return brackets;
  };

  const findClosingBracketForOpeningBracket = (
    editor: CodeMirror.Editor,
    openingBracket: Bracket,
    endLine?: number
  ): Bracket => {
    if (endLine === undefined) {
      endLine = editor.lastLine();
    }
    const openingBracketChar = openingBracket.char;
    const closingBracketChar = openingBracketChar === "{" ? "}" : "]";
    let searchLine = openingBracket.position.from.line;
    if (
      editor.getLine(searchLine).includes(openingBracketChar) &&
      !isBracketInsideCommas(openingBracketChar, editor.getLine(searchLine)) &&
      editor.getLine(searchLine).includes(closingBracketChar) &&
      !isBracketInsideCommas(openingBracketChar, editor.getLine(searchLine))
    ) {
      return {
        position: getWordPositions(
          editor,
          closingBracketChar,
          true,
          searchLine
        )[0],
        char: closingBracketChar,
      };
    }
    searchLine++;
    let bracketsStack = [];
    let closingBracketLine: number | null = null;
    while (closingBracketLine === null && searchLine !== endLine) {
      const lineValue = editor.getLine(searchLine);
      if (
        lineValue.includes(openingBracketChar) &&
        !isBracketInsideCommas(
          openingBracketChar,
          editor.getLine(searchLine)
        ) &&
        lineValue.includes(closingBracketChar) &&
        !isBracketInsideCommas(closingBracketChar, editor.getLine(searchLine))
      ) {
      } else if (
        lineValue.includes(openingBracketChar) &&
        !isBracketInsideCommas(openingBracketChar, editor.getLine(searchLine))
      ) {
        bracketsStack.push(openingBracketChar);
      } else if (
        lineValue.includes(closingBracketChar) &&
        !isBracketInsideCommas(closingBracketChar, editor.getLine(searchLine))
      ) {
        if (bracketsStack[bracketsStack.length - 1] === openingBracketChar) {
          bracketsStack.pop();
        } else {
          closingBracketLine = searchLine;
          break;
        }
      }
      searchLine++;
    }
    if (closingBracketLine !== null) {
      return {
        position: getWordPositions(
          editor,
          closingBracketChar,
          true,
          searchLine
        )[0],
        char: closingBracketChar,
      };
    } else {
      return openingBracket;
    }
  };

  const findPositionByPropertyPath = (
    editor: CodeMirror.Editor,
    propertyPath: string
  ): CodeMirrorWordPosition => {
    let currentCursor: any;
    let currentBottomLine: number = 0;
    const traverseKeys: string[] = propertyPath
      .replace(/\[/g, ".")
      .replace(/\]/g, ".")
      .replace("..", ".")
      .split(".");

    traverseKeys.forEach((key: string, i: number, arr: string[]) => {
      if (!isNaN(parseInt(key))) {
        return;
      }
      if (arr[i - 1] && !isNaN(parseInt(arr[i - 1]))) {
        const idx = parseInt(arr[i - 1]);
        // @ts-ignore
        currentCursor = editor.getSearchCursor("{", {
          line: currentBottomLine,
          ch: 0,
        });
        currentCursor.find();
        currentBottomLine = currentCursor.from().line;
        for (let i = 0; i < idx; i++) {
          // @ts-ignore
          currentCursor = editor.getSearchCursor("{", {
            line: findClosingBracketForOpeningBracket(editor, {
              char: "{",
              position: {
                from: currentCursor.from(),
                to: currentCursor.to(),
              },
            }).position.from.line,
            ch: 0,
          });
          currentCursor.find();
          currentBottomLine = currentCursor.from().line;
        }
        // @ts-ignore
        currentCursor = editor.getSearchCursor(`"${key}"`, {
          line: currentBottomLine,
          ch: 0,
        });
        currentCursor.find();
        currentBottomLine = currentCursor.from().line;
      } else {
        // @ts-ignore
        currentCursor = editor.getSearchCursor(`"${key}"`, {
          line: currentBottomLine,
          ch: 0,
        });
        currentCursor.find();
        currentBottomLine = currentCursor.from().line;
      }
    });

    return {
      from: currentCursor.from(),
      to: currentCursor.to(),
    };
  };

  const findFirstOpeningBracketAfterLine = (
    editor: CodeMirror.Editor,
    searchLine: number,
    bracketChar: string,
    endLine?: number
  ) => {
    if (endLine === undefined) {
      endLine = editor.lastLine();
    }
    while (
      !editor.getLine(searchLine).includes(bracketChar) &&
      searchLine !== endLine
    ) {
      searchLine++;
    }
    if (searchLine === endLine) {
      return null;
    }
    return {
      position: getWordPositions(editor, bracketChar, true, searchLine)[0],
      char: bracketChar,
    };
  };

  const checkExpressionFormatInLine = (
    editor: CodeMirror.Editor,
    lineValue: string,
    lineNumber: number
  ): void => {
    if (!lineValue.includes('"format"')) {
      return;
    }
    const { value: format } = getKeyValuePairFromLine(lineValue);
    if (!isExpressionFormatValid(format)) {
      setErrorLineAndGutter(
        editor,
        getWordPositions(editor, format, true, lineNumber)[0],
        format,
        "invalid format",
        CMErrorType.WRONG_EXP_FORMAT
      );
    }
    // find and check expression due to new format
    let searchLine = lineNumber;
    while (
      !editor.getLine(searchLine).includes('"expression"') &&
      !editor.getLine(searchLine).includes("{")
    ) {
      searchLine--;
    }
    if (!editor.getLine(searchLine).includes('"expression"')) {
      searchLine = lineNumber;
      while (
        !editor.getLine(searchLine).includes('"expression"') &&
        !editor.getLine(searchLine).includes("}")
      ) {
        searchLine++;
      }
    }
    if (editor.getLine(searchLine).includes('"expression"')) {
      removeAllErrorsInLine(editor, searchLine);
      if (isExpressionFormatValid(format)) {
        const { value } = getKeyValuePairFromLine(editor.getLine(searchLine));
        if (value) {
          checkExpressionInLine(editor, editor.getLine(searchLine), searchLine);
        }
      }
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
    const mathInputError = getErrorFromMathInput(
      format as MathInputFormat,
      expression
    );
    if (mathInputError !== null) {
      setErrorLineAndGutter(
        editor,
        getWordPositions(editor, expression, true, lineNumber)[0],
        expression,
        mathInputError,
        CMErrorType.INVALID_EXP
      );
    }
  };

  const checkExcessivePropInLine = (
    editor: CodeMirror.Editor,
    key: string,
    propertyPath: string,
    lineNumber: number,
    initialRedux: any
  ): void => {
    const traverseKeys: string[] = propertyPath
      .replace(/\[[0-9]+\]/g, ".0.")
      .replace("..", ".")
      .split(".");
    let isError = false;
    traverseKeys.forEach((key: string) => {
      if (key === "0") {
        if (Array.isArray(initialRedux)) {
          initialRedux = initialRedux[0];
        } else {
          setErrorLineAndGutter(
            editor,
            getWordPositions(editor, key, true, lineNumber)[0],
            key,
            "unexpected property",
            CMErrorType.EXCESSIVE_PROP
          );
          isError = true;
        }
      } else if (initialRedux.hasOwnProperty(key)) {
        // @ts-ignore
        initialRedux = initialRedux[key];
      } else {
        setErrorLineAndGutter(
          editor,
          getWordPositions(editor, key, true, lineNumber)[0],
          key,
          "unexpected property",
          CMErrorType.EXCESSIVE_PROP
        );
        isError = true;
      }
    });
  };

  const checkAllExcessiveProps = (editor: CodeMirror.Editor) => {
    const editorValue = JSON.parse(editor.getValue());
    const excessiveProps: string[] = [];

    const compareKeys = (obj: any, exampleObj: any, prefix: string) => {
      const exampleKeys = Object.keys(exampleObj);

      Object.keys(obj).forEach((key: string) => {
        if (!exampleKeys.includes(key)) {
          excessiveProps.push(prefix + key);
        } else if (
          Array.isArray(obj[key]) &&
          obj[key].length !== 0 &&
          typeof obj[key][0] === "object"
        ) {
          obj[key].forEach((item: any, i: number) => {
            compareKeys(
              obj[key][i],
              exampleObj[key][0],
              prefix + key + `[${i}].`
            );
          });
        } else if (!Array.isArray(obj[key]) && typeof obj[key] === "object") {
          compareKeys(obj[key], exampleObj[key], prefix + key + ".");
        }
      });
    };

    compareKeys(editorValue, initialReduxJSON, "");

    excessiveProps.forEach((prop: string) => {
      setErrorLineAndGutter(
        editor,
        findPositionByPropertyPath(editor, prop),
        prop.split(".")[prop.split(".").length - 1],
        "unexpected property",
        CMErrorType.EXCESSIVE_PROP
      );
    });
  };

  const checkAllExpressions = (
    editor: CodeMirror.Editor,
    expressions: ExpressionInput[]
  ) => {
    const expPositions = getWordPositions(editor, '"expression"');
    expressions.forEach((expression: ExpressionInput, idx: number) => {
      if (
        isExpressionFormatValid(expression.format) &&
        expression.expression !== ""
      ) {
        const mathInputError = getErrorFromMathInput(
          expression.format,
          expression.expression
        );
        if (mathInputError !== null) {
          const expPosition = expPositions[idx];
          const [errUnderlinePosition] = getWordPositions(
            editor,
            expression.expression,
            true,
            expPosition.from.line
          );
          setErrorLineAndGutter(
            editor,
            errUnderlinePosition,
            expression.expression,
            mathInputError,
            CMErrorType.INVALID_EXP
          );
        }
      }
    });
  };

  const checkAllExpressionsInputFormats = (
    editor: CodeMirror.Editor,
    expressions: ExpressionInput[]
  ) => {
    const formatPositions = getWordPositions(editor, '"format"');
    expressions.forEach((expression: ExpressionInput, idx: number) => {
      if (!isExpressionFormatValid(expression.format)) {
        const formatPosition = formatPositions[idx];
        const [errUnderlinePosition] = getWordPositions(
          editor,
          expression.format,
          true,
          formatPosition.from.line
        );
        setErrorLineAndGutter(
          editor,
          errUnderlinePosition,
          expression.format,
          "wrong format",
          CMErrorType.WRONG_EXP_FORMAT
        );
      }
    });
  };

  const removeAllErrors = (editor: CodeMirror.Editor) => {
    editor.clearGutter("gutter-error");
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      mark.clear();
    });
  };

  const removeAllErrorsInLine = (
    editor: CodeMirror.Editor,
    lineNumber: number
  ) => {
    editor.setGutterMarker(lineNumber, "gutter-error", null);
    editor.getAllMarks().forEach((mark: TextMarker) => {
      // @ts-ignore
      if (mark.lines) {
        // @ts-ignore
        mark.lines.forEach((line) => {
          if (line.lineNo() === lineNumber) {
            // @ts-ignore
            mark.clear();
          }
        });
      }
    });
  };

  const checkAllErrors = (editor: CodeMirror.Editor) => {
    removeAllErrors(editor);
    checkAllExpressionsInputFormats(editor, getAllExpressions(editor));
    checkAllExpressions(editor, getAllExpressions(editor));
    checkAllExcessiveProps(editor);
  };

  // undo redo handling
  const [undoOrRedoIsTriggered, setUndoOrRedoIsTriggered] = useState(false);

  useEffect(() => {
    if (editor && currentHistoryChange && undoOrRedoIsTriggered) {
      try {
        if (currentHistoryChange.type === "ONE_LINE_CHANGE") {
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
            currentHistoryChange.item.value,
            currentHistoryChange.item.propertyPath
              .replace("[", ".")
              .replace("]", "")
          );
          editor.setValue(JSON.stringify(newEditorVal, null, 2));
          editor.setCursor(cursorPos);
        } else if (currentHistoryChange.type === "MULTIPLE_LINES_CHANGE") {
          editor.setValue(JSON.stringify(currentHistoryChange.item, null, 2));
          // @ts-ignore
          updateCurrentReduxJSON(currentHistoryChange.item);
        }
      } catch (e) {
        console.error("ERROR WHILE UNDO/REDO", e.message);
        return;
      }
    }
  }, [currentHistoryChange]);

  useEffect(() => {
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
        checkAllErrors(editor);
      };
      editor.redo = () => {
        setUndoOrRedoIsTriggered(true);
        redo(constructorType);
        setUndoOrRedoIsTriggered(false);
        try {
          updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        } catch (e) {}
        checkAllErrors(editor);
      };

      // validity chek vars
      let lastValidValue: any = JSON.parse(editor.getValue());
      let isJSONValid: boolean = true;

      // setup editor's onchange logic
      editor.on("change", (editor, changeObject) => {
        // handle changes only if JSON is valid, store the last valid JSON while invalid
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
            checkAllErrors(editor);
            return;
          }
          lastValidValue = JSON.parse(editor.getValue());
          isJSONValid = true;
        } catch {
          setJSONValidity(constructorType, false);
          isJSONValid = false;
          return;
        }

        if (isOneLineChange(changeObject)) {
          const changedLineNum: number = changeObject.from.line;
          const changedLineValue: string = editor.getLine(changedLineNum);

          // calculate values after and before change
          const { key: newKey, value: newVal } = getKeyValuePairFromLine(
            changedLineValue
          );
          const { key: oldKey, value: oldVal } = (() => {
            if (
              changeObject.origin === "+input" ||
              changeObject.origin === "paste"
            ) {
              return getKeyValuePairFromLine(
                changedLineValue.slice(0, changeObject.from.ch) +
                  changedLineValue.slice(
                    changeObject.from.ch + changeObject.text[0].length
                  )
              );
            } else {
              return getKeyValuePairFromLine(
                changedLineValue.slice(0, changeObject.from.ch) +
                  // @ts-ignore
                  changeObject.removed[0] +
                  changedLineValue.slice(changeObject.from.ch)
              );
            }
          })();

          // important for debug
          console.log("New vals: ", newVal, newKey);
          console.log("Old vals: ", oldVal, oldKey);

          const notMatchingOpeningBrackets = getNotMatchingOpeningBracketsBeforeLine(
            editor,
            changedLineNum
          ).sort((a: Bracket, b: Bracket) => {
            if (a.position.from.line > b.position.from.line) {
              return 1;
            } else {
              return -1;
            }
          });

          let expPrefix = "";

          notMatchingOpeningBrackets.forEach(
            (bracket: Bracket, i: number, brackets: Bracket[]) => {
              if (brackets[i - 1] && brackets[i - 1].char === "[") {
                const closingArrayBracketLine = findClosingBracketForOpeningBracket(
                  editor,
                  brackets[i - 1]
                ).position.from.line;
                // find first opening bracket after opened array
                const openingBracketChar = bracket.char;
                let idxCounter: number = -1;
                let searchIdxsLine = brackets[i - 1].position.from.line;
                while (
                  findFirstOpeningBracketAfterLine(
                    editor,
                    searchIdxsLine,
                    openingBracketChar,
                    closingArrayBracketLine
                  ) !== null
                ) {
                  idxCounter++;
                  searchIdxsLine = findClosingBracketForOpeningBracket(
                    editor,
                    findFirstOpeningBracketAfterLine(
                      editor,
                      searchIdxsLine,
                      openingBracketChar,
                      closingArrayBracketLine
                    ) as Bracket,
                    closingArrayBracketLine
                  ).position.from.line;
                }
                expPrefix += `[${idxCounter}]`;
              } else if (bracket.char === "[" || bracket.char === "{") {
                // find key of opening bracket
                let searchKeyLine = bracket.position.from.line;
                while (
                  !editor.getLine(searchKeyLine).match(/\"[A-Za-z]*\":/g)
                ) {
                  searchKeyLine--;
                }
                const { key } = getKeyValuePairFromLine(
                  editor.getLine(searchKeyLine)
                );
                if (expPrefix) {
                  expPrefix += `.${key}`;
                } else {
                  expPrefix = key;
                }
              }
            }
          );

          const newPropertyPath = expPrefix ? expPrefix + `.${newKey}` : newKey;
          const oldPropertyPath = expPrefix ? expPrefix + `.${oldKey}` : oldKey;

          console.log("new property path ", newPropertyPath);
          console.log("old property path ", oldPropertyPath);

          addOneLineChangeToHistory(
            {
              propertyPath: newPropertyPath,
              value: oldVal,
            },
            {
              propertyPath: oldPropertyPath,
              value: newVal,
            },
            constructorType
          );

          // check possible errors
          removeAllErrorsInLine(editor, changedLineNum);
          if (
            changedLineValue.includes('"format"') &&
            getKeyValuePairFromLine(changedLineValue).value
          ) {
            checkExpressionFormatInLine(
              editor,
              changedLineValue,
              changedLineNum
            );
          }
          if (
            changedLineValue.includes('"expression"') &&
            getKeyValuePairFromLine(changedLineValue).value
          ) {
            checkExpressionInLine(editor, changedLineValue, changedLineNum);
          }
          if (newKey !== "") {
            checkExcessivePropInLine(
              editor,
              newKey,
              newPropertyPath,
              changedLineNum,
              initialReduxJSON
            );
          }
        } else if (
          isMultipleLineDelete(changeObject) ||
          isMultipleLineAdd(changeObject)
        ) {
          const oldVal = (() => {
            if (isMultipleLineDelete(changeObject)) {
              return (
                editor.getRange(
                  {
                    line: 0,
                    ch: 0,
                  },
                  changeObject.from
                ) +
                // @ts-ignore
                changeObject.removed.join("") +
                editor.getRange(changeObject.from, {
                  line: editor.lastLine(),
                  ch: 999,
                })
              );
            } else {
              const removedPiece = changeObject.removed
                ? changeObject.removed.reduce((acc: string, line: string) => {
                    return acc + "\n" + line;
                  })
                : null;
              return (
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
                )
              );
            }
          })();

          checkAllErrors(editor);
          addMultipleLinesChangeToHistory(
            JSON.parse(oldVal),
            JSON.parse(editor.getValue()),
            constructorType
          );
        }
        updateCurrentReduxJSON(JSON.parse(editor.getValue()));
      });
      setEditor(editor);
    }
  }, []);

  const actionButtons: ActionButtonProps[] = [
    {
      size: 2,
      action: (editor: CodeMirror.Editor): void => {
        editor.execCommand("find");
      },
      mdiIconPath: mdiMagnify,
      tooltip: "Найти (ctrl + f / cmd + f)",
    },
    {
      size: 2,
      action: (editor: CodeMirror.Editor): void => {
        editor.execCommand("replace");
        let oldEditorValue: any;
        try {
          oldEditorValue = JSON.parse(editor.getValue());
        } catch {
          oldEditorValue = null;
        }
        const replaceAllButton: HTMLButtonElement | null = document.querySelector(
          ".CodeMirror-find-and-replace-dialog--replace-all"
        );
        const replaceButton: HTMLButtonElement | null = document.querySelector(
          ".CodeMirror-find-and-replace-dialog--replace"
        );

        const handleReplace = () => {
          setTimeout(() => {
            checkAllErrors(editor);
            let newEditorValue;
            try {
              newEditorValue = JSON.parse(editor.getValue());
            } catch {
              newEditorValue = null;
            }
            if (oldEditorValue !== null && newEditorValue !== null) {
              addMultipleLinesChangeToHistory(
                oldEditorValue,
                newEditorValue,
                constructorType
              );
            }
          });
        };

        const handleEnterReplace = (event: KeyboardEvent) => {
          if (event.keyCode === 13 || event.code === "Enter") {
            if (
              document.querySelector(
                ".CodeMirror-find-and-replace-dialog--replace"
              ) !== null
            ) {
              handleReplace();
            }
          }

          if (replaceAllButton !== null && replaceButton !== null) {
            [replaceButton, replaceAllButton].forEach(
              (button: HTMLButtonElement) => {
                button.addEventListener("click", handleReplace);
              }
            );
          }
        };

        // handle replace triggered with Enter
        window.removeEventListener("keyup", handleEnterReplace, true);
        window.addEventListener("keyup", handleEnterReplace, true);
      },
      mdiIconPath: mdiFindReplace,
      tooltip: "Найти и заменить (ctrl + shift + f / cmd + opt + f)",
    },
    {
      action: () => {
        try {
          const editorValue = JSON.parse(editor.getValue());
          switch (constructorType) {
            case ConstructorJSONType.NAMESPACE:
              copyToClipboard(JSON.stringify(editor.getValue()));
              break;
            case ConstructorJSONType.RULE_PACK:
              copyToClipboard(
                JSON.stringify(
                  RulePackConstructorFormatter.convertConstructorInputsToSendForm(
                    editorValue
                  ),
                  null,
                  2
                )
              );
              break;
            case ConstructorJSONType.TASK_SET:
              copyToClipboard(
                JSON.stringify(
                  TaskSetConstructorFormatter.convertConstructorInputsToSendForm(
                    editorValue
                  ),
                  null,
                  2
                )
              );
              break;
          }
        } catch {
          console.log("ERROR WHILE COPY");
        }
      },
      mdiIconPath: mdiContentCopy,
      size: 2,
      tooltip: "Скопировать для экспорта",
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
              action={() => button.action(editor)}
            />
          );
        })}
      </div>
      <div className="code-mirror__editor-entry-point" ref={entryPoint} />
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
  setJSONValidity: (constructorType: ConstructorJSONType, isValid: boolean) =>
    dispatch(setJSONValidity(constructorType, isValid)),
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
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CodeMirrorEditor);
