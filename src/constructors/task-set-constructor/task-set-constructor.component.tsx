// libs and hooks
import React, { Dispatch, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import deepEqual from "fast-deep-equal/es6";
// redux
import { createStructuredSelector } from "reselect";
import { selectTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.selectors";
import { updateTaskSetJSON } from "../../redux/constructor-jsons/constructor-jsons.actions";
import { connect, ConnectedProps } from "react-redux";
import CONSTRUCTOR_JSONS_INITIAL_STATE from "../../redux/constructor-jsons/constructor-jsons.state";
// custom hooks
import useMockConstructorToEdit from "../hooks/use-mock-constructor-to-edit";
// lib components
import Draggable from "react-draggable";
// custom components
import MathQuillEditor from "../../components/math-quill-editor/math-quill-editor";
import TaskConstructor, {
  HistoryItem,
} from "../task-constructor/task-constructor.component";
import AppModal from "../../components/app-modal/app-modal.component";
import SelectConstructorItemList from "../../components/filterable-select-list/filterable-select-list.component";
import ConstructorForm from "../../components/constructor-form/constructor-form.component";
// types
import { FilterableSelectListItem } from "../../components/filterable-select-list/filterable-select-list.types";
import { TaskSetConstructorInputs } from "./task-set-constructor.types";
import { RootState } from "../../redux/root-reducer";
import { ConstructorInputProps } from "../../components/constructor-input/construcor-input.types";
import { ConstructorSelectProps } from "../../components/constructor-select/constructor-select.types";
import { TaskConstructorInputs } from "../task-constructor/task-constructor.types";
import {
  ConstructorJSONsTypes,
  UpdateTaskSetJSONAction,
} from "../../redux/constructor-jsons/constructor-jsons.types";
// data
import { mockTasks } from "../task-constructor/task-constructor.mock-data";
import { mockTaskSets } from "./task-set-constructor.mock-data";
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
import {
  AddOneLineChangeToHistoryAction,
  ConstructorHistoryItem,
  ExpressionChange,
  RedoTaskSetHistoryAction,
  UndoTaskSetHistoryAction,
  UpdateTaskSetHistoryIndexAction,
} from "../../redux/constructor-history/constructor-history.types";
import {
  selectCurrentTaskSetHistoryChange,
  selectTaskSetHistory,
  selectTaskSetHistoryIndex,
} from "../../redux/constructor-history/constructor-history.selectors";
import {
  addOneLineChangeToHistory,
  redoTaskSetHistory,
  undoTaskSetHistory,
  updateTaskSetHistoryIndex,
} from "../../redux/constructor-history/constructor-history.actions";

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
}: // updateHistoryIdx,
ConnectedProps<typeof connector>): JSX.Element => {
  const [showHintsBlock, setShowHintsBlock] = useState(false);
  const [startExpressionHint, setStartExpressionHint] = useState("");
  const [goalExpressionHint, setGoalExpressionHint] = useState("");
  const [hintsDeltaX, setHintsDeltaX] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const taskSetToEdit = useMockConstructorToEdit<TaskSetConstructorInputs>(
    mockTaskSets
  );

  const defaultValues: TaskSetConstructorInputs =
    taskSetToEdit && taskSetJSON === CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet
      ? taskSetToEdit
      : taskSetJSON;

  if (
    taskSetToEdit &&
    taskSetJSON === CONSTRUCTOR_JSONS_INITIAL_STATE.taskSet
  ) {
    updateTaskSetJSON(defaultValues);
  }

  const methods = useForm({
    mode: "onSubmit",
    defaultValues,
  });
  const { register, getValues, control, setValue } = methods;
  const fieldArrayMethods = useFieldArray<TaskConstructorInputs>({
    control,
    name: "tasks",
  });
  const { fields, append, remove, swap } = fieldArrayMethods;

  const [levelNames, setLevelNames] = useState<string[]>([]);
  const currentEditedLevelRef: React.RefObject<HTMLInputElement> = React.createRef();
  // const updateDemo = (index: number) => {
  //   setStartExpressionHint(getValues().tasks[index].startExpression);
  //   setGoalExpressionHint(getValues().tasks[index].goalExpression);
  //   if (!showHintsBlock) setShowHintsBlock(true);
  // };

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
  }, []);

  useEffect(() => {
    if (currentHistoryChange?.type === "ONE_LINE_CHANGE") {
      setValue(
        currentHistoryChange.item.propertyPath,
        currentHistoryChange.item.value
      );
      updateTaskSetJSON(getValues());
    }
  }, [currentHistoryChange]);

  const inputs: (ConstructorInputProps | ConstructorSelectProps)[] = [
    {
      name: "nameEn",
      label: "Имя en",
      type: "text",
      defaultValue: defaultValues.nameEn,
    },
    {
      name: "nameRu",
      label: "Имя ru",
      type: "text",
      defaultValue: defaultValues.nameRu,
    },
    {
      name: "code",
      label: "Код",
      type: "text",
      defaultValue: defaultValues.code,
    },
    {
      name: "namespace",
      label: "Namespace",
      type: "text",
      defaultValue: defaultValues.namespace,
    },
  ];

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
        <button
          onClick={() => {
            undo();
          }}
        >
          Назад
        </button>
        <button
          onClick={() => {
            redo();
          }}
        >
          Вперед
        </button>
        <div className="task-set-constructor__form">
          <FormProvider {...methods}>
            <TasksFieldArrayActionsContext.Provider value={fieldArrayMethods}>
              <ConstructorForm
                inputs={inputs}
                register={register}
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
                <h3>Уровни</h3>
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
                        className="btn form-levels-list__action-button"
                        onClick={() => {
                          append({
                            ...taskConstructorDefaultValues,
                            taskCreationType: "manual",
                          });
                          setSelectedLevel(fields.length);

                          // console.log(getValues().tasks.length);
                        }}
                      >
                        <Icon path={mdiPlus} size={1.2} />
                        <span>
                          <b>ручной уровень</b>
                        </span>
                      </button>
                      <button
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
                        <span>авто уровень</span>
                      </button>
                      <button
                        className="btn form-levels-list__action-button u-mr-sm"
                        onClick={() => {
                          setShowSelectModal(true);
                        }}
                      >
                        <Icon path={mdiPlus} size={1.2} />
                        <span>существующий уровень</span>
                      </button>
                      <button
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
                      className="btn form-levels-table__action-button"
                      onClick={() => {
                        append({
                          ...taskConstructorDefaultValues,
                          taskCreationType: "manual",
                        });
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>
                        <b>ручной уровень</b>
                      </span>
                    </button>
                    <button
                      className="btn form-levels-table__action-button"
                      onClick={() => {
                        append({
                          ...taskConstructorDefaultValues,
                          taskCreationType: "auto",
                        });
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>авто уровень</span>
                    </button>
                    <button
                      className="btn form-levels-table__action-button"
                      onClick={() => {
                        swap(0, 1);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>swap</span>
                    </button>
                    <button
                      className="btn form-levels-table__action-button"
                      onClick={() => {
                        setShowSelectModal(true);
                      }}
                    >
                      <Icon path={mdiPlus} size={1.2} />
                      <span>существующий уровень</span>
                    </button>
                    <button
                      className="btn form-levels-table__action-button"
                      onClick={() => console.log(getValues())}
                    >
                      get values
                    </button>
                  </div>
                )}
              </div>
            </TasksFieldArrayActionsContext.Provider>
          </FormProvider>
        </div>

        <AppModal
          isOpen={showSelectModal}
          close={() => setShowSelectModal(false)}
          width="80vw"
          height="80vh"
        >
          <SelectConstructorItemList
            items={Object.keys(mockTasks).map(
              (code: string): FilterableSelectListItem => {
                const { nameRu, namespace } = mockTasks[code];
                return {
                  name: nameRu,
                  namespace,
                  code,
                  taskSet: (() => {
                    const arr = [
                      "интересная игра",
                      "очень сложно",
                      "просто",
                      "ЕГЭ",
                    ];
                    const startIdx = Math.floor(Math.random() * 4);
                    const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;
                    return arr.slice(startIdx, endIdx);
                  })(),
                  subjectType: (() => {
                    const arr = [
                      "тригонометрия",
                      "логарифмы",
                      "теория вероятности",
                      "производные",
                    ];
                    const startIdx = Math.floor(Math.random() * 4);
                    const endIdx = Math.floor(Math.random() * 5) + startIdx + 1;
                    return arr.slice(startIdx, endIdx);
                  })(),
                  onSelect: () => {
                    append(mockTasks[code], true);
                    setShowSelectModal(false);
                    setSelectedLevel(fields.length);
                  },
                };
              }
            )}
            propsToFilter={["namespace", "taskSet", "subjectType"]}
          />
        </AppModal>
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
          <h1>Редактируемый уровень:</h1>
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
                <h1>Редактируемый уровень:</h1>
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
