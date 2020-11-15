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
import { edit } from "ace-builds";
import {
  getErrorFromMathInput,
  MathInputFormat,
} from "../../utils/kotlin-lib-functions";
import ActionButton from "../action-button/action-button.component";
import { mdiFindReplace, mdiMagnify } from "@mdi/js";
import { ActionButtonProps } from "../action-button/action-button.types";

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
}: CodeMirrorProps & ConnectedProps<typeof connector>): JSX.Element => {
  const [editor, setEditor] = useState<any>(null);
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
    // setErrors((prevState) =>
    //   prevState.filter((prevStateError: CMError) => {
    //     return prevStateError.gutterId !== error.gutterId;
    //   })
    // );
  };

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
      editor.on("change", () => {
        try {
          updateCurrentReduxJSON(JSON.parse(editor.getValue()));
        } catch {}
        // excessive props check
        getExcessiveProps(editor.getValue()).forEach(
          (excessiveProp: string) => {
            const excessivePropOnCurrentLinePos = getWordPositions(
              editor,
              excessiveProp,
              true,
              editor.getCursor().line,
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
          }
        );
        // invalid expressions and expression formats check
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
              "invalid format",
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
                  return (
                    !excessivePropOnCurrentLine &&
                    !Array.isArray(excessivePropOnCurrentLine)
                  );
                })
              ) {
                destroyError(error, editor);
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
                        expression.format ===
                          MathInputFormat.STRUCTURE_STRING ||
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

        // checkErrors(editor);
        // getAllExpressions(editor).forEach((expression, i) => {
        //   if (
        //     expression.format !== MathInputFormat.TEX &&
        //     expression.format !== MathInputFormat.PLAIN_TEXT &&
        //     expression.format !== MathInputFormat.STRUCTURE_STRING
        //   ) {
        //     getWordPositions(
        //       editor,
        //       expression.format,
        //       editor.getCursor().line
        //     ).forEach((foundPosition: CodeMirrorWordPosition) => {
        //       setErrorLineAndGutter(
        //         editor,
        //         foundPosition.from,
        //         foundPosition.to,
        //         "Invalid expression format"
        //       );
        //     });
        //   } else {
        //     getWordPositions(editor, expression.expression).forEach(
        //       (foundPosition: CodeMirrorWordPosition) => {
        //         const error = getErrorFromMathInput(
        //           expression.format as MathInputFormat,
        //           expression.expression
        //         );
        //         if (error) {
        //           setErrorLineAndGutter(
        //             editor,
        //             foundPosition.from,
        //             foundPosition.to,
        //             error
        //           );
        //         }
        //       }
        //     );
        //   }
        //   checkErrors(editor);
        // });
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
