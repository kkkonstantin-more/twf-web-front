// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
// custom hooks
import useCreationMode from "../hooks/useCreationType";
// redux
import { createStructuredSelector } from "reselect";
import { selectTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
import {
  selectCurrentTaskSetHistoryChange,
  selectTaskSetHistory,
  selectTaskSetHistoryIndex,
} from "../../redux/constructor-history/constructor-history.selectors";
import {
  addOneLineChangeToHistory,
  redoTaskSetHistory,
  undoTaskSetHistory,
} from "../../redux/constructor-history/constructor-history.actions";
// lib components
import Draggable from "react-draggable";
// custom components
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";
import TaskConstructor from "../task-constructor/task-constructor.component";
import AppModal from "../../components/app-modal/app-modal.component";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
import ConstructorUndoRedoPanel from "../../components/constructor-undo-redo-panel/constructor-undo-redo-panel.component";
import ServerResponseAlert from "../../components/server-response-alert/server-response-alert.component";
// utils
import getConstructorSubmitButtonAndTitleText from "../utiils/get-constructor-submit-button-and-title-text";
import {
  getLastEditedCreationMode,
  getLastExampleConstructorCode,
  setLastEditedCreationMode,
  setLastExampleConstructorCode,
} from "../../utils/local-storage/last-edited-creation-type";
import NamespaceRequestHandler from "../namespace-constructor/namespace-constructor.requests-handler";
import TaskSetConstructorRequestsHandler from "./task-set-constructor.requests-handler";
import TaskSetConstructorFormatter from "./task-set-constructor.formatter";
import { addLastEditedConstructorItemToLocalStorage } from "../../utils/last-edited-constructor-items-local-storage";
// types
import { RootState } from "../../redux/root-reducer";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { TaskConstructorInputs } from "../task-constructor/task-constructor.types";
import {
  ConstructorJSONsTypes,
  UpdateTaskSetJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
import {
  AddOneLineChangeToHistoryAction,
  ConstructorHistoryItem,
  ExpressionChange,
  RedoTaskSetHistoryAction,
  UndoTaskSetHistoryAction,
  UpdateTaskSetHistoryIndexAction,
} from "../../redux/constructor-history/constructor-history.types";
import { ConstructorCreationMode } from "../common-types";
import {
  TaskSetConstructorInputs,
  TaskSetConstructorReceivedForm,
  TaskSetConstructorSendForm,
} from "./task-set-constructor.types";
import { NamespaceReceivedForm } from "../namespace-constructor/namespace-constructor.types";
// data
import { taskConstructorDefaultValues } from "./task-set-constructor.data";
// icons
import Icon from "@mdi/react";
import {
  mdiCloseCircle,
  mdiCommentQuestion,
  mdiFormatListBulleted,
  mdiPlus,
  mdiRobot,
  mdiTableLarge,
  mdiWrench,
} from "@mdi/js";
// styles
import "./task-set-constructor.styles.scss";

// @ts-ignore
export const TasksFieldArrayActionsContext = React.createContext();

const TaskSetConstructor = ({
  taskSetJSON,
  updateTaskSetJSON,
  history,
  historyIdx,
  addItemToHistory,
  undo,
  redo,
  currentHistoryChange,
}: ConnectedProps<typeof connector>): JSX.Element => {
  // defining creation type and dependent vars
  const { code } = useParams();
  const creationMode: ConstructorCreationMode = useCreationMode();
  const titleAndSubmitButtonText: string = getConstructorSubmitButtonAndTitleText(
    creationMode,
    ConstructorJSONsTypes.TASK_SET,
    code
  );
  // state vars
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [hintsDeltaX, setHintsDeltaX] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [levelNames, setLevelNames] = useState<string[]>([]);
  // server response messages
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState<null | string>(null);
  // react-hook-form core functions
  const methods = useForm<TaskSetConstructorInputs>({
    mode: "onSubmit",
  });
  const {
    register,
    getValues,
    control,
    setValue,
    reset,
    handleSubmit,
  } = methods;
  // react-hook-form field-array core functions for managing task constructor
  const fieldArrayMethods = useFieldArray<TaskConstructorInputs>({
    control,
    name: "tasks",
  });
  const { fields, append } = fieldArrayMethods;

  const currentEditedLevelRef: React.RefObject<HTMLInputElement> = React.createRef();
  // const updateDemo = (index: number) => {
  //   setStartExpressionHint(getValues().tasks[index].startExpression);
  //   setGoalExpressionHint(getValues().tasks[index].goalExpression);
  //   if (!showHintsBlock) setShowHintsBlock(true);
  // };
  const [namespaces, setNamespaces] = useState<string[]>([]);

  const updateName = (index: number, newName: string): void => {
    setLevelNames((prevState: string[]) => {
      return prevState.map((name: string, i: number) => {
        return i === index ? newName : name;
      });
    });
  };

  const [visualizationMode, setVisualizationMode] = useState<"table" | "list">(
    "list"
  );

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const mobileHintsRef: React.RefObject<HTMLDivElement> = React.createRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (mobileHintsRef.current) {
      if (window.getComputedStyle(mobileHintsRef.current).display === "block") {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [mobileHintsRef]);

  useEffect(() => {
    if (
      selectedLevel === null &&
      getValues().tasks &&
      getValues().tasks.length !== 0
    ) {
      setSelectedLevel(getValues().tasks.length - 1);
    }
    NamespaceRequestHandler.getAll().then((res: NamespaceReceivedForm[]) => {
      setNamespaces(res.map((ns: NamespaceReceivedForm) => ns.code));
    });
  }, []);

  useEffect(() => {
    if (currentHistoryChange?.type === "ONE_LINE_CHANGE") {
      setValue(
        currentHistoryChange.item.propertyPath,
        currentHistoryChange.item.value
      );
      updateTaskSetJSON(getValues());
    } else if (currentHistoryChange?.type === "MULTIPLE_LINES_CHANGE") {
      reset(currentHistoryChange.item);
      // @ts-ignore
      updateTaskSetJSON(currentHistoryChange?.item);
    }
  }, [currentHistoryChange]);

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "namespaceCode",
      label: "Namespace",
      type: "text",
      options: namespaces.map((ns: string) => ({ label: ns, value: ns })),
      defaultValue: "",
      isMulti: false,
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      defaultValue: "",
      disabled: creationMode === ConstructorCreationMode.EDIT,
    },
    {
      name: "nameEn",
      label: "Имя en",
      type: "text",
      defaultValue: "",
    },
    {
      name: "nameRu",
      label: "Имя ru",
      type: "text",
      defaultValue: "",
    },
    {
      name: "subjectTypes",
      label: "Предметные области",
      options: ["subjectType1", "subjectType2"].map((st: string) => ({
        label: st,
        value: st,
      })),
      isMulti: true,
    },
    {
      name: "otherData",
      label: "Дополнительная информация",
      type: "text",
      defaultValue: "",
    },
  ];

  const lastEditedMode: ConstructorCreationMode | null = getLastEditedCreationMode(
    ConstructorJSONsTypes.TASK_SET
  );

  useEffect(() => {
    if (creationMode === ConstructorCreationMode.CREATE) {
      if (lastEditedMode === ConstructorCreationMode.CREATE) {
        reset(taskSetJSON);
      } else {
        (async () => {
          await reset(CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet);
          setLastEditedCreationMode(
            ConstructorJSONsTypes.TASK_SET,
            creationMode
          );
          updateTaskSetJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.EDIT) {
      if (
        lastEditedMode === ConstructorCreationMode.EDIT &&
        code === taskSetJSON.code
      ) {
        reset(taskSetJSON);
      } else {
        (async () => {
          await reset(
            TaskSetConstructorFormatter.convertReceivedFormToConstructorInputs(
              await TaskSetConstructorRequestsHandler.getOne(code)
            )
          );
          setLastEditedCreationMode(
            ConstructorJSONsTypes.TASK_SET,
            creationMode
          );
          updateTaskSetJSON(getValues());
        })();
      }
    } else if (creationMode === ConstructorCreationMode.CREATE_BY_EXAMPLE) {
      if (
        lastEditedMode === ConstructorCreationMode.CREATE_BY_EXAMPLE &&
        getLastExampleConstructorCode(ConstructorJSONsTypes.TASK_SET) === code
      ) {
        reset(taskSetJSON);
      } else {
        (async () => {
          const taskSetInputs = TaskSetConstructorFormatter.convertReceivedFormToConstructorInputs(
            await TaskSetConstructorRequestsHandler.getOne(code)
          );
          await reset({
            ...taskSetInputs,
            code: taskSetInputs.code + "_new",
            tasks: taskSetInputs.tasks.map((task: TaskConstructorInputs) => ({
              ...task,
              code: task.code + "_new",
            })),
          });
          setLastEditedCreationMode(
            ConstructorJSONsTypes.TASK_SET,
            creationMode
          );
          setLastExampleConstructorCode(ConstructorJSONsTypes.TASK_SET, code);
          updateTaskSetJSON(getValues());
        })();
      }
    }
  }, []);

  const submit = async (data: TaskSetConstructorInputs) => {
    TaskSetConstructorRequestsHandler.submitOne(
      TaskSetConstructorFormatter.convertConstructorInputsToSendForm(data),
      creationMode === ConstructorCreationMode.EDIT ? "patch" : "post"
    )
      .then(() => {
        setErrorMsg(null);
        setSuccessMsg(
          ConstructorCreationMode.EDIT
            ? "Набор задач успешно изменен!"
            : "Набор задач успешно создан!"
        );
        addLastEditedConstructorItemToLocalStorage(
          "last-edited-task-sets",
          data.code
        );
      })
      .catch(() => {
        setSuccessMsg(null);
        setErrorMsg("Произошла ошибка!");
      });
  };

  return (
    <div className="task-set-constructor">
      <div
        className="task-set-constructor__form-container"
        style={{
          width:
            !showHintsBlock || isMobile
              ? "100%"
              : `calc(50% + ${hintsDeltaX}px)`,
        }}
      >
        <ConstructorUndoRedoPanel undo={undo} redo={redo} />
        <div className="task-set-constructor__form">
          <FormProvider {...methods}>
            <TasksFieldArrayActionsContext.Provider value={fieldArrayMethods}>
              <form
                onSubmit={handleSubmit((data) => {
                  submit(data);
                })}
              >
                <h2 className="u-mt-sm">{titleAndSubmitButtonText}</h2>
                <ConstructorForm
                  inputs={inputs}
                  register={register}
                  // @ts-ignore
                  updateJSON={() => updateTaskSetJSON(getValues())}
                  addToHistory={(
                    oldVal: ExpressionChange,
                    newVal: ExpressionChange
                  ) => {
                    addItemToHistory(oldVal, newVal);
                  }}
                  constructorType={ConstructorJSONsTypes.TASK_SET}
                />
                <div className="u-flex" style={{ alignItems: "center" }}>
                  <h3>Задачи</h3>
                  <div className="task-set-constructor__visualization-mode-switchers">
                    <div
                      className={`task-set-constructor__visualization-mode-switcher ${
                        visualizationMode === "list" &&
                        "task-set-constructor__visualization-mode-switcher--active"
                      }`}
                      onClick={() => {
                        setVisualizationMode("list");
                      }}
                    >
                      <Icon path={mdiFormatListBulleted} size={1.5} />
                    </div>
                    <div
                      className={`task-set-constructor__visualization-mode-switcher ${
                        visualizationMode === "table" &&
                        "task-set-constructor__visualization-mode-switcher--active"
                      }`}
                      onClick={() => {
                        setVisualizationMode("table");
                      }}
                    >
                      <Icon path={mdiTableLarge} size={1.5} />
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    visualizationMode === "table"
                      ? "form-levels-table"
                      : "form-levels-list"
                  }`}
                >
                  {visualizationMode === "list" && (
                    <div className="form-levels-list__select">
                      {fields.map((field, index) => {
                        return (
                          <div
                            key={field.id}
                            onClick={() => setSelectedLevel(index)}
                            className={`form-levels-list__select-option ${
                              index === selectedLevel &&
                              "form-levels-list__select-option--active"
                            }`}
                          >
                            <Icon
                              path={
                                field.taskCreationType === "auto"
                                  ? mdiRobot
                                  : mdiWrench
                              }
                              size={2}
                              style={{ marginRight: "1rem" }}
                            />
                            <span>
                              Уровень {index + 1}. {levelNames[index]}
                            </span>
                          </div>
                        );
                      })}
                      <div className="form-levels-list__action-buttons">
                        <button
                          type="button"
                          className="btn form-levels-list__action-button"
                          onClick={async () => {
                            await append({
                              ...taskConstructorDefaultValues,
                              taskCreationType: "manual",
                            });
                            setSelectedLevel(fields.length);
                          }}
                        >
                          <Icon path={mdiPlus} size={1.2} />
                          <span>
                            <b>ручная задача</b>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn form-levels-list__action-button"
                          onClick={() => {
                            append({
                              ...taskConstructorDefaultValues,
                              taskCreationType: "auto",
                            });
                            setSelectedLevel(fields.length);
                          }}
                        >
                          <Icon path={mdiPlus} size={1.2} />
                          <span>авто задача</span>
                        </button>
                        <button
                          type="button"
                          className="btn form-levels-list__action-button u-mr-sm"
                          onClick={() => {
                            setShowSelectModal(true);
                          }}
                        >
                          <Icon path={mdiPlus} size={1.2} />
                          <span>существующая задача</span>
                        </button>
                        <button
                          type="button"
                          className="btn form-levels-list__action-button"
                          onClick={() => console.log(getValues())}
                        >
                          get values
                        </button>
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      visualizationMode === "list"
                        ? "form-levels-list__selected-level"
                        : ""
                    }`}
                  >
                    {fields.map((field, index: number) => {
                      return (
                        <TaskConstructor
                          key={field.id}
                          index={index}
                          defaultValue={fields[index]}
                          updateDemo={() => {}}
                          visualizationMode={visualizationMode}
                          hidden={
                            visualizationMode === "list" &&
                            index !== selectedLevel
                          }
                          updateName={updateName}
                        />
                      );
                    })}
                  </div>
                  {visualizationMode === "table" && (
                    <div className="form-levels-table__action-buttons">
                      <button
                        type="button"
                        className="btn form-levels-table__action-button"
                        onClick={async () => {
                          await append({
                            ...taskConstructorDefaultValues,
                            taskCreationType: "manual",
                          });
                          updateTaskSetJSON(getValues());
                        }}
                      >
                        <Icon path={mdiPlus} size={1.2} />
                        <span>
                          <b>ручная задача</b>
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn form-levels-table__action-button"
                        onClick={async () => {
                          await append({
                            ...taskConstructorDefaultValues,
                            taskCreationType: "auto",
                          });
                          updateTaskSetJSON(getValues());
                        }}
                      >
                        <Icon path={mdiPlus} size={1.2} />
                        <span>авто задача</span>
                      </button>
                      <button
                        type="button"
                        className="btn form-levels-table__action-button"
                        onClick={() => {
                          setShowSelectModal(true);
                        }}
                      >
                        <Icon path={mdiPlus} size={1.2} />
                        <span>существующая задача</span>
                      </button>
                      <button
                        type="button"
                        className="btn form-levels-table__action-button"
                        onClick={() => console.log(getValues())}
                      >
                        get values
                      </button>
                    </div>
                  )}
                </div>
                <ServerResponseAlert
                  errorMsg={errorMsg}
                  successMsg={successMsg}
                />
                <button type="submit" className="btn u-mt-sm">
                  {titleAndSubmitButtonText}
                </button>
              </form>
            </TasksFieldArrayActionsContext.Provider>
          </FormProvider>
        </div>

        {/*<AppModal*/}
        {/*  isOpen={showSelectModal}*/}
        {/*  close={() => setShowSelectModal(false)}*/}
        {/*  width="80vw"*/}
        {/*  height="80vh"*/}
        {/*>*/}
        {/*  <SelectConstructorItemList*/}
        {/*    items={Object.keys(mockTasks).map(*/}
        {/*      (code: string): FilterableSelectListItem => {*/}
        {/*        const { nameRu, namespace } = mockTasks[code];*/}
        {/*        return {*/}
        {/*          name: nameRu,*/}
        {/*          namespace,*/}
        {/*          code,*/}
        {/*          taskSet: (() => {*/}
        {/*            const arr = [*/}
        {/*              "интересная игра",*/}
        {/*              "очень сложно",*/}
        {/*              "просто",*/}
        {/*              "ЕГЭ",*/}
        {/*            ];*/}
        {/*            const startIdx = Math.floor(Math.random() * 4);*/}
        {/*            const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;*/}
        {/*            return arr.slice(startIdx, endIdx);*/}
        {/*          })(),*/}
        {/*          subjectType: (() => {*/}
        {/*            const arr = [*/}
        {/*              "тригонометрия",*/}
        {/*              "логарифмы",*/}
        {/*              "теория вероятности",*/}
        {/*              "производные",*/}
        {/*            ];*/}
        {/*            const startIdx = Math.floor(Math.random() * 4);*/}
        {/*            const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;*/}
        {/*            return arr.slice(startIdx, endIdx);*/}
        {/*          })(),*/}
        {/*          onSelect: () => {*/}
        {/*            append(mockTasks[code], true);*/}
        {/*            setShowSelectModal(false);*/}
        {/*            setSelectedLevel(fields.length);*/}
        {/*          },*/}
        {/*        };*/}
        {/*      }*/}
        {/*    )}*/}
        {/*    propsToFilter={["namespace", "taskSet", "subjectType"]}*/}
        {/*  />*/}
        {/*</AppModal>*/}
      </div>
      {/*HINTS BLOCK*/}
      <div
        className="task-set-constructor__icon"
        onClick={() => setShowHintsBlock(!showHintsBlock)}
      >
        <Icon
          size={3}
          path={showHintsBlock ? mdiCloseCircle : mdiCommentQuestion}
        />
      </div>
      <div
        className={`task-set-constructor__hints-desktop ${
          showHintsBlock && "task-set-constructor__hints-desktop--visible"
        }`}
        style={{
          width: showHintsBlock ? `calc(50% - ${hintsDeltaX}px)` : "0",
        }}
      >
        <Draggable
          axis="x"
          position={{
            x: 0,
            y: 0,
          }}
          defaultClassName="task-set-constructor__hints-desktop-dragger"
          defaultClassNameDragging="task-set-constructor__hints-desktop-dragger task-set-constructor__hints-desktop-dragger--dragging"
          onStop={(_, { lastX }) => {
            setHintsDeltaX((prevState) => {
              return prevState + lastX;
            });
          }}
        >
          <span />
        </Draggable>
        <div className="task-set-constructor__math-quill-hint">
          {showHintsBlock && (
            <>
              <h1>Как писать в TEX:</h1>
              <img
                src={require("../../assets/math-quill-hint.gif")}
                alt="latex editor hint"
                width="100%"
                height="auto"
              />
            </>
          )}
        </div>
        <div className="current-edited-level">
          <h1>Редактируемая задача:</h1>
          <input type="text" ref={currentEditedLevelRef} />
          <MathQuillEditor
            inputRef={currentEditedLevelRef}
            startingLatexExpression={`${startExpressionHint}=..=${goalExpressionHint}`}
          />
        </div>
      </div>
      <div ref={mobileHintsRef} className="task-set-constructor__hints-phone">
        {isMobile && (
          <AppModal
            isOpen={showHintsBlock}
            close={() => setShowHintsBlock(false)}
          >
            <>
              <div className="task-set-constructor__math-quill-hint">
                {showHintsBlock && (
                  <>
                    <h1>Как писать в TEX:</h1>
                    <img
                      src={require("../../assets/math-quill-hint.gif")}
                      alt="latex editor hint"
                      width="100%"
                      height="auto"
                    />
                  </>
                )}
              </div>
              <div className="current-edited-level">
                <h1>Редактируемая задача:</h1>
                <input type="text" ref={currentEditedLevelRef} />
                <MathQuillEditor
                  inputRef={currentEditedLevelRef}
                  startingLatexExpression={`${startExpressionHint}=..=${goalExpressionHint}`}
                />
              </div>
            </>
          </AppModal>
        )}
      </div>
    </div>
  );
};

// connecting redux
const mapState = createStructuredSelector<
  RootState,
  {
    taskSetJSON: TaskSetConstructorInputs;
    history: ConstructorHistoryItem[];
    historyIdx: number;
    currentHistoryChange: ConstructorHistoryItem | undefined;
  }
>({
  taskSetJSON: selectTaskSetJSON,
  history: selectTaskSetHistory,
  historyIdx: selectTaskSetHistoryIndex,
  currentHistoryChange: selectCurrentTaskSetHistoryChange,
});

const mapDispatch = (
  dispatch: Dispatch<
    | UpdateTaskSetJSONAction
    | AddOneLineChangeToHistoryAction
    | UpdateTaskSetHistoryIndexAction
    | RedoTaskSetHistoryAction
    | UndoTaskSetHistoryAction
  >
) => ({
  updateTaskSetJSON: (taskSetJSON: TaskSetConstructorInputs) =>
    dispatch(updateTaskSetJSON(taskSetJSON)),
  addItemToHistory: (oldVal: ExpressionChange, newVal: ExpressionChange) =>
    dispatch(addOneLineChangeToHistory({ oldVal, newVal })),
  undo: () => dispatch(undoTaskSetHistory()),
  redo: () => dispatch(redoTaskSetHistory()),
});

const connector = connect(mapState, mapDispatch);

export default connector(TaskSetConstructor);
